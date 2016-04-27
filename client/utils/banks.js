const banksList = {
  1: "Сбербанк",
  2: "ВТБ",
  3: "АльфаБанк",
  4: "Тинькофф",
  5: "МКБ"
}

export default function getBankName(id) {
  return banksList[id];
}