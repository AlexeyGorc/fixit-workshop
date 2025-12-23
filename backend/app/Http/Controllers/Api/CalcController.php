<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PriceListItem;
use App\Models\Service;
use Illuminate\Http\Request;

class CalcController extends Controller
{
    public function calc(Request $request)
    {
        $data = $request->validate([
            'service_id' => ['required', 'integer', 'exists:services,id'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.price_id' => ['required', 'integer', 'exists:price_list,id'],
            'items.*.qty' => ['required', 'integer', 'min:1', 'max:100'],
            'extra_percent' => ['nullable', 'numeric', 'min:0', 'max:200'],
        ]);

        $service = Service::query()->findOrFail($data['service_id']);

        $items = collect($data['items']);
        $priceIds = $items->pluck('price_id')->unique()->values();

        $priceRows = PriceListItem::query()
            ->where('service_id', $service->id)
            ->whereIn('id', $priceIds)
            ->get()
            ->keyBy('id');

        $breakdown = [];
        $subtotal = 0.0;

        foreach ($items as $item) {
            $row = $priceRows->get((int)$item['price_id']);
            if (!$row) {
                return response()->json([
                    'message' => 'One of price_id does not belong to this service.',
                    'price_id' => (int)$item['price_id'],
                ], 422);
            }

            $qty = (int)$item['qty'];
            $line = (float)$row->price * $qty;

            $subtotal += $line;
            $breakdown[] = [
                'price_id' => $row->id,
                'description' => $row->description,
                'unit_price' => (float)$row->price,
                'qty' => $qty,
                'line_total' => $line,
            ];
        }

        $extraPercent = isset($data['extra_percent']) ? (float)$data['extra_percent'] : 0.0;
        $extraAmount = $subtotal * ($extraPercent / 100.0);
        $total = $subtotal + $extraAmount;

        return response()->json([
            'service' => [
                'id' => $service->id,
                'name' => $service->name,
            ],
            'subtotal' => round($subtotal, 2),
            'extra_percent' => $extraPercent,
            'extra_amount' => round($extraAmount, 2),
            'total' => round($total, 2),
            'breakdown' => $breakdown,
        ]);
    }
}
