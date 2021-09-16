<?php

namespace App\Http\Response\Generic\Error;

use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class ForbiddenResponse
 */
class ForbiddenResponse extends JsonResponse
{
    /**
     * ForbiddenResponse constructor.
     * @param array $errors
     */
    public function __construct(array $errors)
    {
        parent::__construct(['errors' => $errors], 403);
    }
}
