<?php

namespace App\Http\Response\Generic\Error;

use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class UnauthorizedResponse
 */
class UnauthorizedResponse extends JsonResponse
{
    /**
     * UnauthorizedResponse constructor.
     * @param array $errors
     * @param array $headers
     */
    public function __construct(array $errors, array $headers = [])
    {
        parent::__construct(['errors' => $errors], 401, $headers);
    }
}
