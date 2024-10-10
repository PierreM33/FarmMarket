<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Repository\AnimalRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AnimalController extends AbstractController
{
    private $entityManager;
    private $animalRepository;

    public function __construct(EntityManagerInterface $entityManager, AnimalRepository $animalRepository)
    {
        $this->entityManager = $entityManager;
        $this->animalRepository = $animalRepository;
    }

    /**
     * @Route("/api/animals", name="get_animals", methods={"GET"})
     */
    public function getAnimals(): JsonResponse
    {
        $animals = $this->animalRepository->findAll();
        $data = [];

        foreach ($animals as $animal) {
            $data[] = [
                'id' => $animal->getId(),
                'name' => $animal->getName(),
                'age' => $animal->getAge(),
                'type' => $animal->getType(),
                'breed' => $animal->getBreed(),
                'description' => $animal->getDescription(),
                'price' => $animal->getPrice(),
                'status' => $animal->getStatus(),
            ];
        }

        return new JsonResponse($data);
    }

    /**
     * @Route("/api/animals", name="add_animal", methods={"POST"})
     */
    public function addAnimal(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        $animal = new Animal();
        $animal->setName($data['name']);
        $animal->setAge($data['age']);
        $animal->setType($data['type']);
        $animal->setBreed($data['breed']);
        $animal->setDescription($data['description']);
        $animal->setPriceTTC($data['priceTTC']);
        $animal->setStatus($data['status']);

        $this->entityManager->persist($animal);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Animal ajouté avec succès', 'id' => $animal->getId()], Response::HTTP_CREATED);
    
    }

    /**
     * @Route("/api/animals/{id}", name="update_animal", methods={"PUT"})
     */
    public function updateAnimal(Request $request, $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $animal = $this->animalRepository->find($id);

        if (!$animal) {
            return new JsonResponse(['message' => 'Animal non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $animal->setName($data['name'] ?? $animal->getName());
        $animal->setAge($data['age'] ?? $animal->getAge());
        $animal->setType($data['type'] ?? $animal->getType());
        $animal->setBreed($data['breed'] ?? $animal->getBreed());
        $animal->setDescription($data['description'] ?? $animal->getDescription());
        $animal->setPrice($data['priceTTC'] ?? $animal->getPrice());
        $animal->setStatus($data['status'] ?? $animal->getStatus());

        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Animal mis à jour avec succès']);
    }
}
