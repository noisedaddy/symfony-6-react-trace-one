<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SpaController extends AbstractController
{
//    #[Route('/spa', name: 'app_spa')]
//    public function index(): Response
//    {
//        return $this->render('spa/index.html.twig', [
//            'controller_name' => 'SpaController',
//        ]);
//    }

//    /**
//
//     * @Route("/{reactRouting}", name="app_home", requirements={"reactRouting"="^(?!api).+"}, defaults={"reactRouting": null})
//     */
    #[Route('/{reactRouting}', name: 'app_home', requirements: '"reactRouting"="^(?!api).+"')]
    public function index()
    {
        return $this->render('spa/index.html.twig');
    }

}
