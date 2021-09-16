<?php

namespace App\Http\Response\Generic\Error;

use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class PreconditionFailedResponse
 */
class PreconditionFailedResponse extends JsonResponse
{
    /**
     * PreconditionFailedResponse constructor.
     * @param array $messages
     */
    public function __construct(array $messages)
    {
        $data = [
            'errors' => $messages
        ];

        parent::__construct($data, 412);
    }
}
