document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridWeek',
    locale: 'pt-br',
    slotMinTime: "08:00:00",
    slotMaxTime: "18:00:00",
    events: [],
  });

  calendar.render();

  // Inicializar EmailJS
  emailjs.init("tS5t2A9KSZy-KiYMu");

  document.getElementById('reservaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = e.target.nome.value;
    const email = e.target.email.value;
    const inicio = e.target.inicio.value;
    const fim = e.target.fim.value;

    const evento = {
      title: nome,
      start: inicio,
      end: fim,
    };

    calendar.addEvent(evento);

    // Enviar e-mail via EmailJS
    emailjs.send("service_wu7aukz", "template_zf8914b", {
      nome: nome,
      email: email,
      inicio: inicio,
      fim: fim
    }).then(() => {
      alert('Reserva enviada com sucesso!');
      e.target.reset();
    }).catch(error => {
      console.error('Erro ao enviar:', error);
      alert('Erro ao enviar e-mail.');
    });
  });
});
