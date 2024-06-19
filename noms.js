const names = [
    "Aragorn", "Legolas", "Gandalf", "Frodon", "Gimli", "Boromir", "Eowyn", "Faramir", "Galadriel", "Elrond", "Arwen", "Thranduil", "Celeborn", "Glorfindel", "Eomer", "Theoden", "Denethor", "Haldir", "Isildur", "Durin", "Balin", "Dain", "Thorin", "Bifur", "Bofur", "Bombur", "Fili", "Kili", "Oin", "Gloin", "Ori", "Dori", "Nori", "Merlin", "Arthur", "Lancelot", "Guenièvre", "Morgane", "Mordred", "Perceval", "Gauvain", "Tristan", "Iseult", "Aegon", "Daenerys", "Tyrion", "Jon", "Cersei", "Jaime", "Sansa", "Arya", "Bran", "Robb", "Ned", "Catelyn", "Robert", "Stannis", "Renly", "Jorah", "Theon", "Samwell", "Brienne", "Sandor", "Gregor", "Melisandre", "Davos", "Margaery", "Oberyn", "Ellaria", "Ramsay", "Roose", "Eddard", "Joffrey", "Khal", "Viserys", "Hodor", "Gendry", "Missandei", "Bronn", "Podrick", "Ygritte", "Tormund", "Euron", "Yara", "Balon", "Jaqen", "Daario", "Benjen", "Barristan", "Maester", "Gilly", "Shae", "Talisa", "Osha", "Meera", "Jojen", "Lyanna", "Tywin", "Kevan", "Lancel", "Petyr", "Varys", "Pycelle", "Illyrio", "Beric", "Thoros", "Loras", "Harren", "Baelish", "Drogo", "Mance", "Qhorin", "Quaithe", "Shireen", "Doran", "Trystane", "Nymeria", "Grey", "Rhaegar", "Aemon", "Aerys", "Brynden", "Robin", "Yoren", "Hot", "Lommy", "Vardis", "Mord", "Rakharo", "Irri", "Jhiqui", "Doreah", "Selyse", "Sarella", "Areo", "Darkstar", "Rickon", "Shaggydog", "Summer", "Ghost", "Drogon", "Rhaegal", "Viserion", "Leaf", "Coldhands", "Qyburn", "High", "Septa", "Brother", "Biter", "Rorge", "Mero", "Bennu", "Cotter", "Rattleshirt", "Val", "Mother", "Wun", "Matthar", "Morros", "Jaremy", "Garth", "Harlaw", "Damphair", "Aeron", "Alester", "Arianne", "Baelor", "Belwas", "Bowen", "Brandon", "Dacey", "Daeron", "Dalla", "Devan", "Donal", "Dontos", "Dunsen", "Eddison", "Edmure", "Gared", "Gerold", "Grenn", "Gwayne", "Hoster", "Hyle", "Ilyn", "Janos", "Jeor", "Jeyne", "Jory", "Joyeuse", "Jye", "Karyl", "Lothar", "Luwin", "Lynesse", "Lyonel", "Lyra", "Mace", "Maekar", "Mag", "Mandon", "Marillion", "Meryn", "Mirri", "Moqorro", "Myrcella", "Olenna", "Othell", "Patchface", "Qotho", "Rickard", "Rodrik", "Ros", "Salladhor", "Syrio", "Tommen", "Tycho", "Walder", "Wendel", "Yohn", "Elros", "Eragon", "Saruman", "Radagast", "Tom Bombadil", "Dwalin", "Bard", "Beorn", "Smaug", "Thror", "Thrain", "Azog", "Bolg", "Thorin II", "Thrain II", "Dain II", "Dis", "Gorlim", "Beleg", "Brand", "Brodda", "Tuor", "Hurin", "Huor", "Luthien", "Beren", "Maedhros", "Maglor", "Celegorm", "Curufin", "Caranthir", "Amrod", "Amras", "Aredhel", "Fingolfin", "Turgon", "Finrod", "Angrod", "Aegnor", "Gil-galad", "Gildor", "Erestor", "Ecthelion", "Galdor", "Eol", "Lindir", "Gwindor", "Sador", "Rian", "Morwen", "Nienor", "Turin", "Maeglin", "Idril", "Voronwe", "Earendil", "Elwing", "Elladan", "Elrohir", "Amroth", "Nimrodel", "Achilles", "Odysseus", "Hector", "Paris", "Aeneas", "Heracles", "Jason", "Perseus", "Theseus", "Orpheus", "Atalanta", "Medea", "Ariadne", "Daedalus", "Icarus", "Phaethon", "Midas", "Echo", "Narcissus", "Penelope", "Circe", "Calypso", "Helios", "Selene", "Eos", "Iris", "Nemesis", "Nike", "Tyche", "Themis", "Cronus", "Rhea", "Uranus", "Gaia", "Tartarus", "Erebus", "Nyx", "Hemera", "Aether", "Chaos", "Zeus", "Poseidon", "Hades", "Hera", "Demeter", "Hestia", "Apollo", "Artemis", "Ares", "Aphrodite", "Hephaestus", "Hermes", "Athena", "Dionysus", "Hebe", "Pan", "Asclepius", "Eros", "Harmonia", "Hypnos", "Thanatos", "Eris", "Atlas", "Prometheus", "Epimetheus", "Pandora", "Deucalion", "Pyrrha", "Europa", "Minos", "Rhadamanthus", "Sarpedon", "Cadmus", "Oedipus", "Antigone", "Polyneices", "Eteocles", "Creon", "Jocasta", "Laius", "Tiresias", "Megara", "Alcmena", "Iole", "Deianira", "Telephus", "Hypsipyle", "Hippolyta", "Phaedra", "Leda", "Helen", "Clytemnestra", "Castor", "Pollux", "Electra", "Orestes", "Iphigenia", "Chrysothemis", "Tantalus", "Pelops", "Niobe", "Chloris", "Amphion", "Zethus", "Phrixus", "Helle", "Athamas", "Ino", "Leucothea", "Melicertes", "Nephele", "Alcyone", "Ceyx", "Pleiades", "Hyades", "Hesperides", "Corybantes", "Curetes", "Dactyls", "Telchines", "Charon", "Cerberus", "Orthrus", "Geryon", "Echidna", "Typhon", "Chimera", "Hydra", "Sphinx", "Nemean", "Lion", "Scylla", "Charybdis", "Sirens", "Harpies", "Graeae", "Gorgons", "Furies", "Fates", "Muses", "Graces", "Horae", "Morai", "Gigantes", "Titans", "Cyclopes", "Hecatoncheires", "Panes", "Satyrs", "Sileni", "Centaurs", "Naiads", "Dryads", "Oreads", "Oceanids", "Nereids", "Moirai", "Charites", "Alecto", "Megaera", "Tisiphone", "Clotho", "Lachesis", "Atropos", "Calliope", "Clio", "Erato", "Euterpe", "Melpomene", "Polyhymnia", "Terpsichore", "Thalia", "Urania", "Aglaea", "Euphrosyne", "Hebe"
];