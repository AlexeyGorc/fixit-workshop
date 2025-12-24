<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ReviewController extends Controller
{
    // GET /api/reviews?service_id=1
    public function index(Request $request)
    {
        $data = $request->validate([
            'service_id' => ['nullable', 'integer', 'exists:services,id'],
        ]);

        $q = Review::query()
            ->with(['user:id,name', 'service:id,name'])
            ->when($data['service_id'] ?? null, fn ($qq) => $qq->where('service_id', $data['service_id']))
            ->latest();

        return $q->paginate(10);
    }

    // POST /api/reviews (auth required)
    public function store(Request $request)
    {
        $userId = $request->user()->id;

        $data = $request->validate([
            'service_id' => ['required', 'integer', 'exists:services,id'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'content' => ['required', 'string', 'min:5', 'max:2000'],
        ]);

        // один отзыв на услугу (соответствует unique в БД)
        $review = Review::updateOrCreate(
            ['user_id' => $userId, 'service_id' => $data['service_id']],
            ['rating' => $data['rating'], 'content' => $data['content']]
        );

        return response()->json($review->load(['user:id,name', 'service:id,name']), 201);
    }

    // DELETE /api/reviews/{review} (только владелец)
    public function destroy(Request $request, Review $review)
    {
        abort_unless($request->user()->id === $review->user_id, 403);

        $review->delete();

        return response()->json(['ok' => true]);
    }
}
