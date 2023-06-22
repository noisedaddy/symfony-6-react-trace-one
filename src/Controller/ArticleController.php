<?php

namespace App\Controller;

use App\Entity\Article;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


#[Route('/api', name: 'api_')]
class ArticleController extends AbstractController
{
    #[Route('/article', name: 'articles_index', methods: 'GET')]
    public function index(ManagerRegistry $doctrine): Response
    {
        $articles = $doctrine
            ->getRepository(Article::class)
            ->findAll();

        $data = [];

        foreach ($articles as $article) {
            $data[] = [
                'id' => $article->getId(),
                'title' => $article->getTitle(),
                'body' => $article->getBody(),
                'image' => $article->getImage(),
            ];
        }

        return $this->json($data);

//        return $this->render('article/index.html.twig', [
//            'controller_name' => 'ArticleController',
//        ]);
    }

    #[Route('/article', name: 'article_new', methods: 'POST')]
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();

        $project = new Article();
        $project->setTitle($request->request->get('title'));
        $project->setBody($request->request->get('body'));

        $entityManager->persist($project);
        $entityManager->flush();

        return $this->json('Created new article successfully with id ' . $project->getId());
    }

    #[Route('/article/{id}', name: 'articles_show', methods: 'GET')]
    public function show(ManagerRegistry $doctrine, int $id): Response
    {
        $project = $doctrine->getRepository(Article::class)->find($id);

        if (!$project) {

            return $this->json('No article found for id' . $id, 404);
        }

        $data =  [
            'id' => $project->getId(),
            'title' => $project->getTitle(),
            'body' => $project->getBody(),
        ];

        return $this->json($data);
    }

}
