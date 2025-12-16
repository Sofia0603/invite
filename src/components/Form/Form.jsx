import { useState, useRef } from "react";


function Form(){

  const [presence, setPresence] = useState(""); // выбранный формат присутствия
  const [transfer, setTransfer] = useState(""); // выбранный вариант трансфера
  const [kitchenPreference, setKitchenPreference] = useState(""); // предпочтение по кухне
  const [alcoholPreferences, setAlcoholPreferences] = useState([]);
  const [fullName, setFullName] = useState("");
  const [allergy, setAllergy] = useState("");
  const [showNameError, setShowNameError] = useState(false);
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const nameInputRef = useRef(null); // <--- ref для инпута


  const isNameValid = fullName.trim().length > 0;



  const blockIfNoName = (callback) => {
    if (!fullName.trim()) {
      setShowNameError(true);

      if (nameInputRef.current) {
        nameInputRef.current.scrollIntoView({
          behavior: "smooth", // плавно
          block: "center",    // центрируем элемент по вертикали
        });

        setTimeout(() => {
          nameInputRef.current.focus({ preventScroll: true });
        }, 300);
      }

      setTimeout(() => setShowNameError(false), 4000);
      return;
    }

    callback();
  };



  const showTransferOptions = presence === "full";

  const handlePresenceChange = (value) => {
    setPresence(value);
    setTransfer("");
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


  const isFormValid =
    isNameValid &&
    presence &&
    (presence !== "full" || transfer) &&
    kitchenPreference &&
    alcoholPreferences.length > 0;

  const formData = {
    fullName,
    presence,
    transfer,
    kitchenPreference,
    alcoholPreferences,
    allergy,
  };




  return (
    <form data-aos="fade-up">

      <div className="relative">
        {showNameError && (
          <div
            className="absolute -top-[45px] left-1/2 -translate-x-1/2
              bg-primary-dark text-white text-[11px] p-2 rounded-lg
              animate-shake z-10 max-w-[138px] leading-none"
            >
            сначала введите <br/> свое имя и фамилию

            {/* стрелочка */}
            <span
              className="absolute -bottom-[10px] left-1/2 -translate-x-1/2
                          w-0 h-0
                          border-l-[10px] border-l-transparent
                          border-r-[10px] border-r-transparent
                          border-t-[12px] border-t-primary-dark"
            />
          </div>

        )}

        <input
          type="text"
          placeholder="Имя и фамилия"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          ref={nameInputRef} // <--- здесь
          className="font-actay pt-2 pb-1 px-2 text-primary-dark border border-primary-dark rounded-lg text-center w-[226px]"
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
              onChange={() => blockIfNoName(() => handlePresenceChange("full"))}
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
              onChange={() => blockIfNoName(() => handlePresenceChange("banquet"))}

            />
            <span className="w-[14px] h-[14px] rounded-full border border-primary-dark bg-transparent flex items-center justify-center">
            <span className={`w-[8px] h-[8px] rounded-full bg-primary-dark transition-transform ${presence === "banquet" ? "scale-100" : "scale-0"}`} />
          </span>
            <span className="font-actay">только на банкете</span>
          </label>
        </div>

        {/* Окно с трансфером */}
        <div className={`absolute top-[20px] left-[40px] right-[40px] bg-primary-dark text-white p-4 rounded-lg transition-all duration-500 ease-out
            ${
            showTransferOptions && !transfer
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
                 }
                `}
            >
          <h4 className="font-cafeparis mb-2">
            ТРЕБУЕТСЯ ЛИ ВАМ ТРАНСФЕР ОТ ЗАГСА ДО МЕСТА ПРОВЕДЕНИЯ БАНКЕТА?
          </h4>

          <div className="flex flex-col">
            {[
              "Да, буду благодарен(на)",
              "Нет, доберусь сам(а)",
              "Нет, буду на своём авто",
            ].map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="transfer"
                  className="hidden"
                  checked={transfer === option}
                  onChange={() =>
                    blockIfNoName(() => handleTransferChange(option))
                  }
                />

                <span className="w-[14px] h-[14px] rounded-full border border-white flex items-center justify-center">
                  <span
                    className={`w-[8px] h-[8px] rounded-full bg-white transition-transform ${
                      transfer === option ? "scale-100" : "scale-0"
                    }`}
                  />
                </span>

                <span className="font-actay">{option}</span>
              </label>
            ))}
          </div>
        </div>


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

                onChange={() => blockIfNoName(() => handleKitchenChange(option))}
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
              <input type="checkbox" className="opacity-0 absolute w-5 h-5" checked={alcoholPreferences.includes(option)}
                     onChange={() => blockIfNoName(() => toggleAlcoholPreference(option))}
              />
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
              <input type="text" name="allergy" className="font-actay text-[15px] pt-1 pb-0 px-2 leading-none text-primary-dark border border-primary-dark rounded-lg w-[194px]"
                     placeholder="Ваш ответ.."
                     onChange={(e) => setAllergy(e.target.value)}

              />
            </label>
        </div>



      </div>


      <div className="relative">
        {showSubmitError && (
          <div
            className="absolute -top-[25px] left-1/2 -translate-x-1/2
              bg-primary-dark text-white text-[11px] px-2 py-4 rounded-lg
              animate-shake z-10 max-w-[180px] leading-none"
          >
            сначала введите свое имя <br/>
            и фамилию и пройдите опрос
            {/* стрелочка */}
            <span
              className="absolute -bottom-[10px] left-1/2 -translate-x-1/2
                          w-0 h-0
                          border-l-[10px] border-l-transparent
                          border-r-[10px] border-r-transparent
                          border-t-[12px] border-t-primary-dark"
            />
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            if (!isFormValid) {
              setShowSubmitError(true);
              setTimeout(() => setShowSubmitError(false), 4000);
              return;
            }
            setShowModal(true);
            console.log(formData);
            // 👉 здесь отправка данных в backend → telegram bot
          }}
          className="font-cormorant bg-primary-dark py-2 px-5 rounded-3xl uppercase text-white mt-10"
        >
          подтвердить присутствие
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-primary-dark rounded-xl text-center max-w-[290px] w-full animate-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-xl text-white"
            >
              ✕
            </button>

            <p className="font-cafeparis text-xl text-white my-10">
              СПАСИБО! <br />
              МЫ ПОЛУЧИЛИ ВАШЕ <br />
              ПОДТВЕРЖДЕНИЕ И ОТВЕТЫ
            </p>
          </div>
        </div>
      )}


      <img
        src="/invite/images/rings-small.svg"
        alt=""
        data-aos="fade-up"
        className="max-w-[50px] mx-auto mt-2"
      />

    </form>
  )
}

export default Form;