<?php

namespace App\Entity;

use App\Entity\PasswordHash;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    public const USER_GROUP = 'user';

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"user"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"user"})
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $password;

    public function __construct($username, $password)
    {
        $this->username = $username;
        $this->setNewPassword($password);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function verifyPassword(string $possiblePassword): bool
    {
        if ($this->password === null) {
            return false;
        }

        return PasswordHash::verify($this->password, $possiblePassword);
    }


    public function setNewPassword(string $password): void
    {
        $this->password = PasswordHash::hash($password);
    }

    public function setPassword($password): void
    {
        $this->password = $password;
    }



    public function getRoles(): array
    {
        return [];
    }

    public function getSalt()
    {
        return null;
    }

    public function eraseCredentials()
    {
        return null;
    }

    public function getUserIdentifier(): string
    {
        return $this->username;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setUsername($username): void
    {
        $this->username = $username;
    }
}
