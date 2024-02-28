<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveNotNullFromEmailOnUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Rename the old table
        Schema::rename('users', 'old_users');

        // Create a new table
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('password');
            $table->timestamps();
        });

        // Copy data from the old table to the new one
        DB::table('users')->insert(DB::table('old_users')->get()->toArray());

        // Drop the old table
        Schema::dropIfExists('old_users');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // You can reverse the migration by doing the same steps in reverse order
    }
}