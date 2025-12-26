<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $ids = Favorite::query()
            ->where('user_id', $user->id)
            ->pluck('service_id');

        return response()->json([
            'service_ids' => $ids,
        ]);
    }

    public function toggle(Request $request)
    {
        $data = $request->validate([
            'service_id' => ['required', 'integer', 'exists:services,id'],
        ]);

        $userId = $request->user()->id;
        $serviceId = (int) $data['service_id'];

        $existing = Favorite::query()
            ->where('user_id', $userId)
            ->where('service_id', $serviceId)
            ->first();

        if ($existing) {
            $existing->delete();

            return response()->json([
                'service_id' => $serviceId,
                'is_favorite' => false,
            ]);
        }

        Favorite::create([
            'user_id' => $userId,
            'service_id' => $serviceId,
        ]);

        return response()->json([
            'service_id' => $serviceId,
            'is_favorite' => true,
        ], 201);
    }
}
