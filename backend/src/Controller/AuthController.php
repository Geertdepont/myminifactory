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
 * @Route("/auth")
 */
class AuthController extends AbstractController
{
    private $em;
    private $userRepository;

    public function __construct(
        UserRepository $userRepository,
        EntityManagerInterface $em
    )
    {
        $this->userRepository = $userRepository;
        $this->em = $em;
    }

    /**
     * @param SerializerInterface $serializer
     * @param Request $request
     * @return Response
     * @Route("/register", methods={"POST"}, name="api_auth_register")
     * ,
     */
    public function create(SerializerInterface $serializer, Request $request, JWTTokenManagerInterface $JWTManager): Response
    {
        $requestData = $request->toArray();
        $errors = $this->validateCreateRequest($requestData);

        if (count($errors) > 0 ) {
            return new BadRequestResponse($errors);
        }

        $username = $requestData['username'];
        $password = $requestData['password'];

        $user = new User( $username, $password);
        $this->em->persist($user);
        $this->em->flush();

        return new JsonResponse(['token' => $JWTManager->create($user)]);
    }

    /**
     * @param User $user
     * @param JWTTokenManagerInterface $JWTManager
     * @return JsonResponse
     */
    public function getTokenUser(User $user, JWTTokenManagerInterface $JWTManager)
    {
        return new JsonResponse(['token' => $JWTManager->create($user)]);
    }

    /**
     * @param string[] $request
     * @return string[]
     */
    public function validateCreateRequest(array $request): array
    {
        $errors = [];

        if (!isset($request['username']) || $request['username'] == "") {
            $errors["username"] = 'No username was specified';
        } else {
            $username = $this->userRepository->findOneBy(['username' => $request['username']]);
            if ($username != null) {
                $errors["username"] = 'A user with this email already exists';
            }
        }

        if (!isset($request['password']) || $request['password'] == "") {
            $errors["password"] = 'No password was specified';
        }

        return $errors;
    }
}
