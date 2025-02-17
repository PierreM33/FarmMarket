<?php

declare(strict_types = 1);

namespace App\EventSubscriber;

use App\Entity\User;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authenticator\JWTAuthenticator;
use Lexik\Bundle\JWTAuthenticationBundle\Services;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use function in_array;


class BodySubscriber implements EventSubscriberInterface
{

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => [
                'onKernelRequest',
                10,
            ],
        ];
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();
    
        if (empty($request->getContent())) {
            return;
        }
    
        if (in_array($request->getContentType(), [null, 'json', 'txt'], true)) {
            $decodedData = json_decode($request->getContent(), true);
    
            // Vérifie que le décodage n'a pas échoué et que le résultat est un tableau
            if (json_last_error() === JSON_ERROR_NONE && is_array($decodedData)) {
                $request->request->replace($decodedData);
            } else {
                error_log('Erreur de décodage JSON : ' . json_last_error_msg());
            }
        }
    }
    
}