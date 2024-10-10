<?php

namespace App\Repository;

use App\Entity\Animal;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Animal>
 *
 * @method Animal|null find($id, $lockMode = null, $lockVersion = null)
 * @method Animal|null findOneBy(array $criteria, array $orderBy = null)
 * @method Animal[]    findAll()
 * @method Animal[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AnimalRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Animal::class);
    }

    public function add(Animal $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Animal $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    // Ajoutez des méthodes personnalisées ici si nécessaire

    /**
     * @return Animal[] Returns an array of Animal objects
     */
    public function findByType($type): array
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.type = :val')
            ->setParameter('val', $type)
            ->orderBy('a.id', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function findOneByName($name): ?Animal
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.name = :val')
            ->setParameter('val', $name)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
