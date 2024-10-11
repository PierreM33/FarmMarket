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
        try {
            // Récupérer les données du formulaire
            $name = $request->request->get('name');
            $age = $request->request->get('age');
            $type = $request->request->get('type');
            $breed = $request->request->get('breed');
            $description = $request->request->get('description');
            $priceTTC = $request->request->get('priceTTC');
            $status = $request->request->get('status');

            // Validation des données requises
            if (empty($name) || empty($age) || empty($type) || empty($breed) || empty($description) || empty($priceTTC) || empty($status)) {
                return new JsonResponse(['error' => 'Tous les champs sont requis.'], Response::HTTP_BAD_REQUEST);
            }

            // Création de l'animal
            $animal = new Animal();
            $animal->setName($name);
            $animal->setAge($age);
            $animal->setType($type);
            $animal->setBreed($breed);
            $animal->setDescription($description);
            $animal->setPriceTTC($priceTTC);
            $animal->setStatus($status);

            // Gestion de l'upload de la photo
            if ($photoFile = $request->files->get('photo')) {
                $photoPath = uniqid() . '.' . $photoFile->guessExtension();
                $photoFile->move($this->getParameter('photos_directory'), $photoPath);
                $animal->setPhotoPath($photoPath);
            }

            // Persist et flush
            $this->entityManager->persist($animal);
            $this->entityManager->flush();

            return new JsonResponse(['message' => 'Animal ajouté avec succès', 'id' => $animal->getId()], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
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
