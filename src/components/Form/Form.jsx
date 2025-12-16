import { useState } from "react";

function Form(){

  const [presence, setPresence] = useState(""); // выбранный формат присутствия
  const [transfer, setTransfer] = useState(""); // выбранный вариант трансфера
  const [kitchenPreference, setKitchenPreference] = useState(""); // предпочтение по кухне

  const [alcoholPreferences, setAlcoholPreferences] = useState([]);


  // проверяем, показывать ли окно с трансфером
  const showTransferOptions = presence === "full";

  const handlePresenceChange = (value) => {
    setPresence(value);
    setTransfer(""); // сбрасываем выбор трансфера при смене формата
  };

  const handleTransferChange = (value) => {
    setTransfer(value);
  };

  const handleKitchenChange = (value) => {
    setKitchenPreference(value);
  };

  const toggleAlcoholPreference = (option) => {
    if (alcoholPreferences.includes(option)) {
      setAlcoholPreferences(alcoholPreferences.filter((p) => p !== option));
    } else {
      setAlcoholPreferences([...alcoholPreferences, option]);
    }
  };


  const alcoholOptions = ["нет особых предпочтений", "не пью алкоголь", "красное полусухое вино", "красное полусладкое вино", "белое полусухое вино", "белое полусладкое вино", "игристое", "виски", "коньяк", "водка"];
  const kitchenOptions = [
    "нет особых предпочтений",
    "предпочитаю мясо",
    "предпочитаю рыбу"
  ];

  return (
    <form>

      <div className="relative">
        {/* ERROR */}
        <div className="hidden absolute -top-[55px] left-[145px] p-1 rounded-lg bg-primary-dark max-w-[125px] text-[11px] text-white">
          сначала введите свое имя и фамилию
          <span className="absolute -bottom-[10px] left-[50px] w-0 h-0 border-l-[10px] border-l-transparentborder-r-[10px] border-r-transparent border-t-[10px] border-t-primary-dark"/>
        </div>
        <input type="text" placeholder="Имя и фамилия"
          name="fullName"
          className="font-actay pt-2 pb-1 px-2 leading-none text-primary-dark border border-primary-dark rounded-lg text-center w-[226px]"
        />
      </div>


      <div className="bg-bg-extra-light relative rounded-xl mx-3 p-3 text-left mt-4">

        <div className="mb-3">
          <h3 className="font-mirra text-xl mb-2 ">Формат вашего присутствия</h3>

          <label className="group flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="presence-format"
              className="hidden"
              checked={presence === "на церемонии в ЗАГСе и на банкете"}
              onChange={() => handlePresenceChange("full")}
            />
            <span className="w-[14px] h-[14px] rounded-full border border-primary-dark bg-transparent flex items-center justify-center">
            <span className={`w-[8px] h-[8px] rounded-full bg-primary-dark transition-transform ${presence === "full" ? "scale-100" : "scale-0"}`} />
          </span>
            <span className="font-actay">на церемонии в ЗАГСе и на банкете</span>
          </label>

          <label className="group flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="presence-format"
              className="hidden"
              checked={presence === "только на банкете"}
              onChange={() => handlePresenceChange("banquet")}
            />
            <span className="w-[14px] h-[14px] rounded-full border border-primary-dark bg-transparent flex items-center justify-center">
            <span className={`w-[8px] h-[8px] rounded-full bg-primary-dark transition-transform ${presence === "banquet" ? "scale-100" : "scale-0"}`} />
          </span>
            <span className="font-actay">только на банкете</span>
          </label>
        </div>

        {/* Окно с трансфером */}
        {showTransferOptions && !transfer && (
          <div className="bg-primary-dark absolute top-[20px] left-[40px] right-[40px] shadow-lg rounded-lg p-4 mx-3 text-white text-center max-w-[279px] opacity-95">
            <h4 className="font-cafeparis mb-2">
              ТРЕБУЕТСЯ ЛИ ВАМ ТРАНСФЕР ОТ ЗАГСА ДО МЕСТА ПРОВЕДЕНИЯ БАНКЕТА?
            </h4>
            <div className="flex flex-col">
              {[
                "Да, буду благодарен(на)",
                "Нет, доберусь сам(а)",
                "Нет, буду на своём авто"
              ].map((option, index) => (
                <label key={index} className="group flex items-center gap-2 cursor-pointer justify-start bg-primary-dark text-white rounded-lg ">
                  <input type="radio" name="transfer" className="hidden" checked={transfer === option} onChange={() => handleTransferChange(option)}/>
                  <span className="w-[14px] h-[14px] rounded-full border border-white flex items-center justify-center">
                     <span className={`w-[8px] h-[8px] rounded-full bg-white transition-transform ${transfer === option ? "scale-100" : "scale-0"}`}/>
                   </span>
                  <span className="font-actay font-normal">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}


        {/* Предпочтения по кухне */}
        <div className="mt-4 mb-2">
          <h3 className="font-mirra text-xl mb-2">Предпочтения по кухне</h3>
          {kitchenOptions.map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer ">
              <input
                type="radio"
                name="kitchen-preferences"
                className="hidden"
                checked={kitchenPreference === option}
                onChange={() => handleKitchenChange(option)}
              />
              <span className="w-[14px] h-[14px] rounded-full border border-primary-dark flex items-center justify-center">
                <span className={`w-[8px] h-[8px] rounded-full bg-primary-dark transition-transform ${kitchenPreference === option ? "scale-100" : "scale-0"}`} />
              </span>
              <span className="font-actay">{option}</span>
            </label>
          ))}
        </div>


        {/* Предпочтения по алкоголю (кастомные прозрачные чекбоксы) */}
        <div className="mt-6">
          <h3 className="font-mirra text-xl mb-3">Предпочтения по алкоголю</h3>

          {alcoholOptions.map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer mb-2 relative">
              <input type="checkbox" className="opacity-0 absolute w-5 h-5" checked={alcoholPreferences.includes(option)} onChange={() => toggleAlcoholPreference(option)}/>

              <span className={`w-[14px] h-[14px] border border-black flex items-center justify-center transition-colors ${alcoholPreferences.includes(option) ? "bg-primary-dark" : "bg-transparent"}`}>

                {alcoholPreferences.includes(option) && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              <span className="font-actay">{option}</span>
            </label>
          ))}
        </div>


        <div className="mt-4 mb-2">
          <h3 className="font-mirra text-xl mb-2">Есть ли у вас пищевая аллергия?</h3>
            <label className="flex items-center gap-2 cursor-pointer ">
              <input type="text" name="allergy" className="font-actay text-[15px] pt-1 pb-0 px-2 leading-none text-primary-dark border border-primary-dark rounded-lg w-[194px]" placeholder="Ваш ответ.."/>
            </label>
        </div>



      </div>


    </form>
  )
}

export default Form;