<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Service;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            // гостевые данные (если нет авторизации)
            'name' => ['nullable','string','min:2','max:255'],
            'email' => ['nullable','email','max:255'],
            'phone' => ['nullable','string','max:50'],
            'details' => ['nullable','string'],

            // заказ от услуги:
            'service_id' => ['nullable','integer','exists:services,id'],

            // заказ из калькулятора:
            'items' => ['nullable','array'],
            'items.*.price_id' => ['required_with:items','integer'],
            'items.*.qty' => ['required_with:items','integer','min:1','max:100'],

            // total теперь можно не передавать для service_id
            'total' => ['nullable','numeric','min:0'],
        ]);

        $user = $request->user('sanctum') ?? auth()->user();

        if (!$user) {
            $request->validate([
                'name' => ['required','string','min:2','max:255'],
                'email' => ['required','email','max:255'],
            ]);
        }

        $total = $data['total'] ?? null;
        if ($total === null && !empty($data['service_id'])) {
            $service = Service::query()->find($data['service_id']);
            $total = (float)($service?->price ?? 0);
        }
        $total = $total ?? 0;

        $order = Order::create([
            'user_id' => $user?->id,
            'service_id' => $data['service_id'] ?? null,

            'name' => $user?->name ?? $data['name'],
            'email' => $user?->email ?? $data['email'],
            'phone' => $user?->phone ?? ($data['phone'] ?? null),

            'details' => $data['details'] ?? null,
            'items_json' => $data['items'] ?? null,
            'total' => $total,

            'order_date' => now()->toDateString(),
            'order_status' => 'pending',
        ]);

        return response()->json([
            'id' => $order->id,
            'order_status' => $order->order_status,
        ], 201);
    }

    public function show(Order $order)
    {
        return $order->load('service:id,name,category,subcategory');
    }
}
