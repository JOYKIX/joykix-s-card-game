const abilities = [
    "Maîtrise de l'épée", "Lancer de hache", "Tir à l'arc", "Magie de feu", "Magie de glace", "Magie de la terre", "Magie de l'air", "Invisibilité", "Téléportation", "Guérison", "Nécromancie", "Invocation de créatures", "Enchantement", "Alchimie", "Élémentalisme", "Manipulation du temps", "Maîtrise de l'ombre", "Maîtrise de la lumière", "Contrôle des esprits", "Métamorphose", "Pyromancie", "Cryomancie", "Géomancie", "Aéromancie", "Clairvoyance", "Illusion", "Chant de guerre", "Rage berserk", "Vision nocturne", "Respiration aquatique", "Immunité aux poisons", "Vitesse accrue", "Force surhumaine", "Agilité accrue", "Résistance magique", "Détection de pièges", "Esquive", "Maîtrise des poisons", "Combat à mains nues", "Survie en milieu hostile", "Dressage d'animaux", "Langue des anciens", "Communication animale", "Télékinésie", "Bouclier magique", "Armure éthérée", "Voix d'orateur", "Séduction", "Inspiration", "Lame dansante", "Coup critique", "Volonté de fer", "Esprit indomptable", "Énergie vitale", "Connexion spirituelle", "Savoir ancien", "Stratégie de combat", "Invocation de golems", "Invocation d'élémentaires", "Aura de protection", "Choc électrique", "Saut en hauteur", "Création de portails", "Fusion avec la nature", "Bouclier de feu", "Bouclier de glace", "Bouclier de terre", "Bouclier d'air", "Résurrection", "Détection de mensonges", "Analyse de combat", "Connaissance des herbes", "Discrétion", "Mimétisme", "Maîtrise des runes", "Maîtrise des artefacts", "Maîtrise des parchemins", "Régénération", "Vision spirituelle", "Souffle du dragon", "Éclair divin", "Purification", "Chant des sirènes", "Bénédiction", "Malédiction", "Étreinte de la mort", "Invocation d'ombres", "Miroir magique", "Duplication", "Absorption d'énergie", "Protection divine", "Voile de brume", "Maîtrise des éléments", "Esprit de la forêt", "Fureur de la nature", "Vent de la destruction", "Marche sur l'eau", "Vision des âmes", "Rage du berserker", "Furtivité", "Précision mortelle", "Évasion", "Camouflage", "Lancer de couteaux", "Lancer de javelot", "Lancer de shurikens", "Poing de fer", "Clé de bras", "Projection", "Serrure mentale", "Manipulation de la gravité", "Contrôle de l'espace", "Saut dimensionnel", "Bouclier psychique", "Impact mental", "Lien spirituel", "Méditation", "Empathie", "Projection astrale", "Maîtrise des flammes", "Maîtrise des glaces", "Maîtrise des tempêtes", "Maîtrise des séismes", "Manipulation de la matière", "Intangibilité", "Transmutation", "Peau de pierre", "Peau d'acier", "Maîtrise du venin", "Maîtrise de l'acide", "Maîtrise des toxines", "Chant de guérison", "Chant de désespoir", "Chant de victoire", "Écho de guerre", "Vol de vie", "Drain de mana", "Renforcement des alliés", "Affaiblissement des ennemis", "Récupération rapide", "Vision du futur", "Connexion avec les ancêtres", "Fusion des esprits", "Invocation de familiers", "Maîtrise des armes", "Maîtrise des boucliers", "Maîtrise des lances", "Maîtrise des épées", "Maîtrise des arcs", "Maîtrise des arbalètes", "Maîtrise des haches", "Maîtrise des marteaux", "Maîtrise des fouets", "Maîtrise des bâtons", "Maîtrise des dagues", "Maîtrise des fléaux", "Maîtrise des masses", "Maîtrise des katanas", "Maîtrise des naginatas", "Maîtrise des tridents", "Maîtrise des sabres", "Maîtrise des hallebardes", "Maîtrise des cimeterres", "Maîtrise des glaives", "Maîtrise des poignards", "Maîtrise des scimitars", "Maîtrise des tonfas", "Maîtrise des sai", "Maîtrise des kusarigamas", "Maîtrise des boomerangs", "Maîtrise des bolas", "Maîtrise des chakrams", "Maîtrise des kunais", "Maîtrise des kris", "Maîtrise des zanbatōs", "Maîtrise des nodachis", "Maîtrise des tessen", "Maîtrise des kamas", "Maîtrise des shillelaghs", "Maîtrise des bo", "Maîtrise des jo", "Maîtrise des nunchakus", "Maîtrise des escrimes", "Maîtrise des rapières", "Maîtrise des épées longues", "Maîtrise des claymores", "Maîtrise des zweihanders", "Maîtrise des spadons", "Maîtrise des fauchards", "Maîtrise des guisarmes", "Maîtrise des ranseurs", "Maîtrise des cangues", "Maîtrise des harpons", "Maîtrise des piques", "Maîtrise des pertuisanes", "Maîtrise des ronds-de-cuir", "Maîtrise des boucliers-targe", "Maîtrise des pavois", "Maîtrise des broigne", "Maîtrise des hauberts", "Maîtrise des cuirasses", "Maîtrise des armures lamellaires", "Maîtrise des armures d'écailles", "Maîtrise des armures de plaques", "Maîtrise des armures de cuir", "Maîtrise des armures de maille", "Maîtrise des armures de fourrure", "Maîtrise des armures de tissu", "Maîtrise des boucliers ronds", "Maîtrise des boucliers en forme de larme", "Maîtrise des boucliers en forme de cerf", "Maîtrise des boucliers en forme de tour", "Maîtrise des boucliers en forme de losange", "Maîtrise des boucliers en forme de flèche", "Maîtrise des boucliers en forme de croix", "Maîtrise des boucliers en forme de trèfle", "Maîtrise des boucliers en forme de cœur", "Maîtrise des boucliers en forme de pique", "Maîtrise des boucliers en forme de rondelle", "Maîtrise des boucliers en forme de cerceau", "Maîtrise des boucliers en forme de disque", "Maîtrise des boucliers en forme de cercle", "Maîtrise des boucliers en forme de tourteau", "Maîtrise des boucliers en forme de cloche", "Maîtrise des boucliers en forme de gousse", "Maîtrise des boucliers en forme de cône", "Maîtrise des boucliers en forme de cylindre", "Maîtrise des boucliers en forme de dôme", "Maîtrise des boucliers en forme de sphère", "Maîtrise des boucliers en forme de globe", "Maîtrise des boucliers en forme de bulle", "Maîtrise des boucliers en forme de sphéroïde", "Maîtrise des boucliers en forme de sphérule", "Maîtrise des boucliers en forme de sphéron", "Maîtrise des boucliers en forme de sphericule", ];