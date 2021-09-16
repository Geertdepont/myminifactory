<?php

namespace App\Controller;

use App\Entity\User;
use App\Http\Response\Generic\Error\BadRequestResponse;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @package App\Controller
 * @Route("/api", name="user_api")
 */
class UserController extends AbstractController
{
    private $userRepository;
    private $serializer;

    public function __construct(
        SerializerInterface $serializer,
        UserRepository $userRepository
    )
    {
        $this->serializer = $serializer;
        $this->userRepository = $userRepository;
    }

    /**
     * @return Response
     * @Route("/user", methods={"GET"}, name="get-users")
     * ,
     */
    public function list(): Response
    {
        $users = $this->userRepository->findAll();

        return new Response(
            $this->serializer->serialize(
                $users,
                'json',
                ['groups' => 'user']
            )
        );
    }
}
