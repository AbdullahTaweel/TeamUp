<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectUserEventTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_user_event', function (Blueprint $table) {
            $table->id();
            $table->boolean('isOwner')->default(false);
            $table->text('report')->nullable();
            $table->foreignId('users_id')->constrained()->onDelete('cascade');
            $table->foreignId('project_id')->constrained('project')->onDelete('cascade');
            $table->timestamps();
            $table->unique(['users_id', 'project_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_user_event');
    }
}
