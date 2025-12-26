<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $u = $request->user();

        return response()->json([
            'user' => [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'phone' => $u->phone ?? null,
                'created_at' => optional($u->created_at)->toISOString(),
            ],
        ]);
    }

    public function update(Request $request)
    {
        $u = $request->user();

        $data = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($u->id),
            ],
        ]);

        $u->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
        ]);

        return response()->json([
            'user' => [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'phone' => $u->phone ?? null,
                'created_at' => optional($u->created_at)->toISOString(),
            ],
        ]);
    }

    public function orders(Request $request)
    {
        $u = $request->user();

        $orders = Order::query()
            ->with(['service:id,name'])
            ->where(function ($q) use ($u) {
                $q->where('user_id', $u->id);

                $q->orWhere(function ($qq) use ($u) {
                    $qq->whereNull('user_id')
                        ->where('email', $u->email);

                    if (!empty($u->phone)) {
                        $qq->orWhere(function ($qqq) use ($u) {
                            $qqq->whereNull('user_id')
                                ->where('phone', $u->phone);
                        });
                    }
                });
            })
            ->orderByDesc('id')
            ->paginate(10);

        return response()->json($orders);
    }
}
