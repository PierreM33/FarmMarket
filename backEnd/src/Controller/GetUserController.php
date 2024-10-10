<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\Security;


class GetUserController extends AbstractController
{

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    private $userController;
    /**
     * @var User
     */
    private $user;


    public function __construct(EntityManagerInterface $entityManager, UserController $userController, Security $security)
    {
        $this->entityManager = $entityManager;
        $this->userController = $userController;
        $this->user = $security->getUser();
    }

    /**
     * @Route("/api/user/{id}", name="retrieveUser", methods={"GET"})
     * @param Request $request
     * @param $id
     * @return Response
     */

    public function retrieveUser(Request $request, $id): Response
    {

        try {
            $userArray = $this->entityManager->getRepository(User::class)->find($id);

            if (!$userArray) {
                return new JsonResponse(["message" => "Utilisateur non trouvé."], Response::HTTP_NOT_FOUND);
            }

            
            $idUser = $this->user->getId();

            
            return new JsonResponse($this->userController->getInformationUser($userArray));
        } catch (\Exception $exception) {
            return new JsonResponse(["CATCH", $exception->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
