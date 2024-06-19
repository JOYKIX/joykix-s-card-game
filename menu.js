function navigateTo(page) {
    window.location.href = page;
}

document.addEventListener('DOMContentLoaded', () => {
    const versionNumber = '1.1.0';
    const patchNotes = [
	    'Suppression du niveau et des stats dans le calcul de possibilités',
        'Ajout de 164 classes.',
		'Ajout de 47 races.',
		'Ajout de 97 compétences.',
		'Ajout de 60 armes.',
    ];

    document.getElementById('versionNumber').textContent = versionNumber;
    const patchNotesList = document.getElementById('patchNotesList');
    patchNotes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note;
        patchNotesList.appendChild(li);
    });
});
