document.getElementById('enviarAlerta').addEventListener('click', function() {
    const modelo = document.getElementById('modelo').value;
    const cor = document.getElementById('cor').value;
    const ano = document.getElementById('ano').value;
    const foto = document.getElementById('foto').files[0]; // Captura o arquivo de imagem

    const reader = new FileReader(); // Cria um FileReader para ler o arquivo de imagem
    reader.onload = function(event) {
        const imgElement = new Image(); // Cria um novo elemento de imagem
        imgElement.src = event.target.result; // Define a fonte da imagem para o arquivo lido
        imgElement.onload = function() {
            // Cria um canvas e desenha a imagem e o texto nele
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = imgElement.width; // Define a largura do canvas igual à da imagem
            canvas.height = imgElement.height; // Define a altura do canvas igual à da imagem
            ctx.drawImage(imgElement, 0, 0); // Desenha a imagem no canvas
            ctx.font = '20px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(`Modelo: ${modelo}`, 10, 30); // Adiciona o texto sobre a imagem
            ctx.fillText(`Cor: ${cor}`, 10, 60);
            ctx.fillText(`Ano: ${ano}`, 10, 90);

            // Converte o canvas em uma imagem para download
            const dataURL = canvas.toDataURL('image/jpeg');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'AlertaRoubo.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    };
    if(foto) {
        reader.readAsDataURL(foto); // Lê o arquivo de imagem como Data URL
    }
});