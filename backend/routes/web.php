<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Livewire\Volt\Volt;
use App\Livewire\Admin\News\Index as NewsIndex;
use App\Livewire\Admin\Contacts\Index as ContactsIndex;
use \App\Livewire\Admin\Services\Index as ServicesIndex;
use \App\Livewire\Admin\Projects\Index as ProjectsIndex;
use \App\Livewire\Admin\Prices\Index as PricesIndex;
use \App\Livewire\Admin\Orders\Index as OrdersIndex;

Route::get('/', function () {
    return view('livewire.auth.login');
})->name('home');

Route::view('dashboard', 'dashboard')
    ->middleware(['auth', 'verified', 'role:admin'])
    ->name('dashboard');

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
   Route::get('/news', NewsIndex::class)->name('news.index');
   Route::get('/contacts', ContactsIndex::class)->name('contacts.index');
    Route::get('/services', ServicesIndex::class)->name('services');
    Route::get('/prices', PricesIndex::class)->name('prices');
    Route::get('/orders', OrdersIndex::class)->name('orders');
    Route::get('/projects', ProjectsIndex::class)->name('projects');
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::redirect('settings', 'settings/profile');

    Volt::route('settings/profile', 'settings.profile')->name('profile.edit');
    Volt::route('settings/password', 'settings.password')->name('user-password.edit');
    Volt::route('settings/appearance', 'settings.appearance')->name('appearance.edit');

    Volt::route('settings/two-factor', 'settings.two-factor')
        ->middleware(
            when(
                Features::canManageTwoFactorAuthentication()
                && Features::optionEnabled(Features::twoFactorAuthentication(), 'confirmPassword'),
                ['password.confirm'],
                [],
            ),
        )
        ->name('two-factor.show');
});
