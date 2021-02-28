<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $table = 'comment';

    /**
    * The database primary key value.
    *
    * @var string
    */
    protected $primaryKey = 'id';


    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
                  'content',
                  'issue',
                  'users_id',
                  'task_id'
              ];

    public function users(){
        return $this->belongsTo(User::class);
    }


    public function task(){
        return $this->belongsTo(Task::class);
    }

}
