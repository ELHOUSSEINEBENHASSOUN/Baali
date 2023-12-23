# Configurer Git
1/- git config --global user.name "Elhousseine BENHASSOUN"
2/- git config --global user.email "Houss.benhassoun.1999@gmail.com"
git config user.name
git config user.email

# initialisation Projet
1/- git init

# First Commit
1/- git status
2/- git add file.txt                 ==> Ajouter un file dans staging area
3/- git add .                        ==> Ajouter tous dans staging area
4/- git commit -m "first project"    ==> Ajouter dans local repo

# Annuler initialisation Projet
1/- rm -rf .git                      ==> Supprimer dossier .git

# Afficher le Log et les details Avec Show
1/- git log               ==> Afficher infos du personne qui exécuter toutes les commit 
2/- git show              ==> comme log ms plus les details et pour exit click sur q
3/- git ls-files          ==> Afficher les files commiter

# Ignorer des Fichiers et dossiers
1/- node_modules/         ==> Pour Ignorer des dossiers
2/- File.txt              ==> Pour Ignorer des fichiers

# Créer et manipuler les branche
1/- git branch            ==> lister tous les branches actuelle par défaut (*master)
2/- git checkout -b houss ==> Créer un branche et positionnement en meme temps
3/- git checkout master   ==> retour à la branche master
4/- git merge houss       ==> Fusionner les modification de la branche Houss dans master
5/- git branch -d houss   ==> supprimer une branche
6/- git branch -D houss   ==> Forcer la supression d'une branche (utiliser si vous avez pas pu fusion)

# Reset et Reflog
1/- git reflog            ==> Afficher toutes les commit exécuter
2/- git reset --hard id   ==> retour a la commit récent

# Lier entre le depot local et distant
1/- git remote -v         ==> voir le repository distant on liaison avec nous
2/- git remote add origin https://github.com/ELHOUSSEINEBENHASSOUN/Baali.git  ==> lier repository local avec repository distant

# Envoyer le code vers distant avec push
1/- git branch -M main    ==> Renames the current Git branch to 'main' while forcefully replacing any existing branch with the same name.
2/- git remote add origin https://github.com/ELHOUSSEINEBENHASSOUN/Baali.git
3/- git push -u origin main


