<?php

namespace App\Http\Response\Generic\Error;

use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class NotFoundResponse
 */
class NotFoundResponse extends JsonResponse
{
    /**
     * NotFoundResponse constructor.
     * @param string $message
     */
    public function __construct(string $message = 'Resource not found')
    {
        parent::__construct([
            'errors' => [$message]
        ], 404);
    }
}
