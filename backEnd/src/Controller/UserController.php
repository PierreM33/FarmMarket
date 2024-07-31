<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    public function getInformationUser(User $user): array
    {
        return [
            'id' => $user->getId(),
            'name' => $user->getUsername(),
            'password' => $user->getPassword(),
            'email' => $user->getEmail(),
        ];
    }
}
