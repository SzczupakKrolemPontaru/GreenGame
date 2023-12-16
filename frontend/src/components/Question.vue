<template>
  <div>
    <Quiz :questions="questions"/>
  </div>
</template>

<script>
import Quiz from './Quiz.vue';

export default {
  name: "Question",
  components: {
    Quiz
  },
  data() {
    return {
      questions: [
        {
          text: 'Które z poniższych gazów jest głównym gazem cieplarnianym, odpowiedzialnym za globalne ocieplenie?',
          answers: ['Tlen (O2)', 'Azot (N2)', 'Dwutlenek węgla (CO2)', 'Metan (CH4)'],
          correctAnswerIndex: 2
        },
        {
          text: 'Które źródło energii jest najbardziej przyjazne dla środowiska?',
          answers: ['Węgiel', 'Gaz ziemny', 'Energia słoneczna', 'Energia jądrowa'],
          correctAnswerIndex: 2
        },
        {
          text: 'Które działanie najlepiej przyczynia się do redukcji ilości odpadów?',
          answers: ['Składowanie odpadów na wysypiskach', 'Recykling', 'Spalanie odpadów', 'Produkcja większej ilości odpadów'],
          correctAnswerIndex: 1
        },
        {
          text: "Jakie jest główne źródło zanieczyszczenia powietrza w miastach?",
          answers: ["Emisje z fabryk", "Spaliny samochodowe", "Energia wiatrowa","Sadzenie drzew"],
          correctAnswerIndex: 2
        },
        {
          text: "Co to jest efekt cieplarniany?",
          answers:
              ["Proces, w którym Ziemia ochładza się", "Zjawisko, które zwiększa ilość promieniowania słonecznego", "Zwiększenie temperatury atmosfery Ziemi z powodu zatrzymywania ciepła",
                "Zjawisko zmniejszające stężenie gazów cieplarnianych"],
          correctAnswerIndex: 3
        },
        {
          text: "Co to jest biodegradacja?",
          answers: [
            "Proces rozkładu substancji przez mikroorganizmy",
            "Proces tworzenia substancji chemicznych",
            "Zanieczyszczenie wód",
            "Proces wzrostu roślin"
          ],
          correctAnswerIndex: 1
        },
        {
          text: "Które z poniższych działań ma największy wpływ na ochronę zasobów wodnych?",
          answers: [
            "Zanieczyszczanie rzek",
            "Oszczędne korzystanie z wody",
            "Wylewanie oleju do oceanu",
            "Budowanie zapór"
          ],
          correctAnswerIndex: 2
        },
        {
          text: "Które z poniższych źródeł energii jest nieodnawialne?",
          answers: [
            "Energia słoneczna",
            "Wiatr",
            "Węgiel",
            "Geotermalna"
          ],
          correctAnswerIndex: 3
        },
        {
          text: "Co to jest ślad węglowy?",
          answers: [
            "Liczba ludzi mieszkających w danym regionie",
            "Liczba zanieczyszczeń atmosferycznych w danym regionie",
            "Całkowita ilość dwutlenku węgla wyemitowanego przez daną osobę, produkt lub firmę",
            "Wartość promieniowania słonecznego docierającego do powierzchni Ziemi"
          ],
          correctAnswerIndex: 3
        },
        {
          text: "Jakie jest główne źródło deforestacji?",
          answers: [
            "Zmiany klimatyczne",
            "Pestycydy",
            "Wycinka drzew na potrzeby rolnictwa i urbanizacji",
            "Spalanie biomasy"
          ],
          correctAnswerIndex: 3
        }
      ]
    };
  },
};
</script>
