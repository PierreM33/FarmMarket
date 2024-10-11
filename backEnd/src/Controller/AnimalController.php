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
                'price' => $animal->getPriceTTC(),
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
            
            $name = $request->request->get('name');
            $age = $request->request->get('age');
            $type = $request->request->get('type');
            $breed = $request->request->get('breed');
            $description = $request->request->get('description');
            $priceTTC = $request->request->get('priceTTC');
            $status = $request->request->get('status');

            // Validation des données requises (photo n'est plus inclus)
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

        
            $this->entityManager->persist($animal);
            $this->entityManager->flush();

            return new JsonResponse(['message' => 'Animal ajouté avec succès', 'id' => $animal->getId()], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }



    /**
     * @Route("/api/animals/{id}", name="update_animal", methods={"POST"})
     */
    public function updateAnimal(Request $request, $id): JsonResponse
    {
        $animal = $this->animalRepository->find($id);

        if (!$animal) {
            return new JsonResponse(['message' => 'Animal non trouvé'], Response::HTTP_NOT_FOUND);
        }

        // Récupérer les données du formulaire
        $name = $request->request->get('name', $animal->getName());
        $age = $request->request->get('age', $animal->getAge());
        $type = $request->request->get('type', $animal->getType());
        $breed = $request->request->get('breed', $animal->getBreed());
        $description = $request->request->get('description', $animal->getDescription());
        $priceTTC = $request->request->get('priceTTC', $animal->getPriceTTC());
        $status = $request->request->get('status', $animal->getStatus());

        // Validation de l'âge
        if ($age < 0) {
            return new JsonResponse(['message' => 'L\'âge doit être un nombre positif'], Response::HTTP_BAD_REQUEST);
        }

        // Mettre à jour les propriétés de l'animal
        $animal->setName($name);
        $animal->setAge($age);
        $animal->setType($type);
        $animal->setBreed($breed);
        $animal->setDescription($description);
        $animal->setPriceTTC($priceTTC);
        $animal->setStatus($status);

        // Gestion de l'upload de la photo (si nécessaire)
        if ($photoFile = $request->files->get('photo')) {
            $photoPath = uniqid() . '.' . $photoFile->guessExtension();
            $photoFile->move($this->getParameter('photos_directory'), $photoPath);
            $animal->setPhotoPath($photoPath);
        }

        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Animal mis à jour avec succès']);
    }

    /**
     * @Route("/api/public/animals", name="get_public_animals", methods={"GET"}) 
     */
    public function getPublicAnimals(): JsonResponse 
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
                'price' => $animal->getPriceTTC(),
                'status' => $animal->getStatus(),
            ];
        }

        return new JsonResponse($data);
    }


}
