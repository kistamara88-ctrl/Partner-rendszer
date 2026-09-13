<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasColumn('users', 'postal_code') && ! Schema::hasColumn('users', 'shipping_postal_code')) {
            Schema::table('users', function (Blueprint $table) {
                $table->renameColumn('postal_code', 'shipping_postal_code');
            });
        }

        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'billing_postal_code')) {
                $table->string('billing_postal_code')->nullable();
            }

            if (! Schema::hasColumn('users', 'billing_city')) {
                $table->string('billing_city')->nullable();
            }

            if (! Schema::hasColumn('users', 'billing_address')) {
                $table->string('billing_address')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('users', 'shipping_postal_code') && ! Schema::hasColumn('users', 'postal_code')) {
            Schema::table('users', function (Blueprint $table) {
                $table->renameColumn('shipping_postal_code', 'postal_code');
            });
        }
    }
};
