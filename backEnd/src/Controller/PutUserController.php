<?php

// src/Controller/PutUserController.php
namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class PutUserController extends AbstractController
{
    /**
     * @Route("/api/user/{id}", name="update_user", methods={"PUT"})
     */
    public function update(Request $request, UserRepository $userRepository, int $id): Response
    {
        // Retrieve the user from the database
        $user = $userRepository->find($id);

        if (!$user) {
            throw new NotFoundHttpException('User not found');
        }

        // Check if the currently authenticated user is allowed to update this user
        if ($this->getUser() !== $user) {
            throw new AccessDeniedHttpException('You are not allowed to update this user');
        }

        // Get the data from the request
        $data = json_decode($request->getContent(), true);
        $username = $data['username'] ?? null;

        if ($username) {
            $user->setUsername($username);
        }

        // Save changes to the database
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        return new JsonResponse([
            'status' => 'User updated',
            'username' => $user->getUsername(),
        ], Response::HTTP_OK);
    }
}
