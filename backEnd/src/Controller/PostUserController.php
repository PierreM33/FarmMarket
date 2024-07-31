<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PostUserController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */

    private $entityManager;

    public function __construct( EntityManagerInterface $entityManager) {
        $this->entityManager=$entityManager;
    }

    /**
     * @Route("/api/createUser", name="createUser", methods={"POST"})
     * @param Request $request
     * @return Response
     */

    public function createUser(Request $request, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        $this->entityManager->beginTransaction();
    
        try {

    
            //Penser à importer dans Src/EventSubscriber pour que cette syntaxe fonctionne
            $name = $request->request->get('username');
            $password = $request->request->get('password');
            $email = $request->request->get('email');
    
            if (empty($email)) {
                return new JsonResponse("L'e-mail est obligatoire", Response::HTTP_BAD_REQUEST);
            }
    
            $user = new User();
            $user->setUsername($name);
            $user->setPassword($passwordEncoder->encodePassword($user, $password));
            $user->setEmail($email);
    
            $this->entityManager->persist($user);
            $this->entityManager->flush();
            $this->entityManager->commit();

            return new JsonResponse("success", Response::HTTP_CREATED);
        } catch (\Doctrine\DBAL\Exception\UniqueConstraintViolationException $e) {
            $this->entityManager->rollback();
            var_dump($e->getMessage()); // Ajoutez cette ligne pour afficher le message d'erreur

            return new JsonResponse("L'utilisateur avec cet e-mail existe déjà.", Response::HTTP_BAD_REQUEST);
        } catch (\Exception $e) {
            $this->entityManager->rollback();
    
            return new JsonResponse("Une erreur est survenue : " . $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}




