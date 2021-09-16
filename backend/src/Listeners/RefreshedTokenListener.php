<?php

namespace App\Listeners;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Cookie;

class RefreshedTokenListener implements EventSubscriberInterface
{
    private $ttl;

    public function __construct($tokenTtl)
    {
        $this->ttl = $tokenTtl;
    }

    public function setRefreshToken(AuthenticationSuccessEvent $event) {
        var_dump($event->getData());
        die();

        $refreshToken = $event->getData()['refresh_token'];
        $response = $event->getResponse();

        if ($refreshToken) {
            $expire = new \DateTime();
            $expire->add(new \DateInterval('PT' . $this->ttl . 'S' ));
            $response->headers->setCookie(
                new Cookie('REFRESH_TOKEN', $refreshToken, $expire )
            );
        }


    }

    public static function getSubscribedEvents(): array
    {
        return [
            'lexik_jwt_authentication.on_authentication_sucess' => [
                ['setRefreshToken']
            ]
        ];
    }
}
