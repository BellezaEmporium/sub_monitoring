<?php

class Subscriptions
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'screen_numbers',
        'remaining_screens'
    ];
}
