<?php

namespace App\Listeners;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\Cookie;

class AuthenticationSuccessListener
{

    private $tokenTtl;

    public function __construct($tokenTtl)
    {
        $this->tokenTtl = $tokenTtl;
    }

    public function onAuthenticationSuccess(AuthenticationSuccessEvent $event)
    {
        $response = $event->getResponse();
        $data = $event->getData();
        $token= $data['token'];
        $expire = new \DateTime();
        $expire->add(new \DateInterval('PT' . $this->tokenTtl . 'S' ));

        $response->headers->setCookie(
            new Cookie('Bearer', $token, $expire )
        );

    }
}
