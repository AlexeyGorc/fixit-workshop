<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required','string','min:2','max:255'],
            'email' => ['required','email','max:255'],
            'phone' => ['nullable','string','max:50'],
            'details' => ['nullable','string'],

            // либо заказ от услуги:
            'service_id' => ['nullable','integer','exists:services,id'],

            // либо заказ из калькулятора:
            'items' => ['nullable','array'],
            'items.*.price_id' => ['required_with:items','integer'],
            'items.*.qty' => ['required_with:items','integer','min:1','max:100'],

            'total' => ['required','numeric','min:0'],
        ]);

        $order = Order::create([
            'user_id' => auth()->id(),
            'service_id' => $data['service_id'] ?? null,
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'details' => $data['details'] ?? null,
            'items_json' => $data['items'] ?? null,
            'total' => $data['total'],
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
