import { useState } from "react";
import { categories } from "../../data/categories";
import { Item } from "../../types/Item";
import * as C from "./styles";

type Props = {
  onAdd: (item: Item) => void;
};

const InputArea = ({ onAdd }: Props) => {
  const [categoryField, setCategoryField] = useState("");
  const [priceField, setPriceField] = useState(0);
  const [titleField, setTitleField] = useState("");
  const [dateField, setDateField] = useState("");

  let categoryKeys: string[] = Object.keys(categories);
  const handleAddEvent = () => {
    let errors: string[] = [];
    if (isNaN(new Date(dateField).getTime())) {
      errors.push("Data inválida");
    }

    if (!categoryKeys.includes(categoryField)) {
      errors.push("Categoria inválida");
    }

    if (titleField === "") {
      errors.push("Título vazio!");
    }
    if (priceField <= 0) {
      errors.push("Valor inválido!");
    }
    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      onAdd({
        date: new Date(dateField),
        category: categoryField,
        title: titleField,
        value: priceField,
      });
      clearFields();
    }
  };

  const clearFields = () => {
    setDateField("");
    setCategoryField("");
    setTitleField("");
    setPriceField(0);
  };
  return (
    <C.Container>
      <C.InputLabel>
        <C.InputTitle>Data</C.InputTitle>
        <C.Input
          type='date'
          value={dateField}
          onChange={(e) => setDateField(e.target.value)}
        />
      </C.InputLabel>
      <C.InputLabel>
        <C.InputTitle>Categoria</C.InputTitle>
        <C.Select
          value={categoryField}
          onChange={(e) => setCategoryField(e.target.value)}
        >
          <>
            <option></option>
            {categoryKeys.map((key, index) => (
              <option key={index} value={key}>
                {categories[key].title}
              </option>
            ))}
          </>
        </C.Select>
      </C.InputLabel>
      <C.InputLabel>
        <C.InputTitle>Titulo</C.InputTitle>
        <C.Input
          type='text'
          value={titleField}
          onChange={(e) => setTitleField(e.target.value)}
        />
      </C.InputLabel>
      <C.InputLabel>
        <C.InputTitle>Valor</C.InputTitle>
        <C.Input
          type='number'
          value={priceField}
          onChange={(e) => setPriceField(parseFloat(e.target.value))}
        />
      </C.InputLabel>
      <C.InputLabel>
        <C.InputTitle>&nbsp;</C.InputTitle>
        <C.Button onClick={handleAddEvent}>Adicionar</C.Button>
      </C.InputLabel>
    </C.Container>
  );
};

export default InputArea;
