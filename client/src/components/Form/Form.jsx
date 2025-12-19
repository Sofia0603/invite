import { useState, useRef, useEffect} from "react";
import {trySubmit} from "../../utils/formLocalStorage.js";


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
  const [isSubmitting, setIsSubmitting] = useState(false);



  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Очистка эффекта на размонтировании
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);


  const nameInputRef = useRef(null); // <--- ref для инпута


  const blockIfNoName = (callback) => {
    const words = fullName.trim().split(/\s+/);

    if (words.length < 2) { // проверка на минимум 2 слова
      setShowNameError(true);

      if (nameInputRef.current) {
        nameInputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
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




  const showTransferOptions = presence === "На церемонии в ЗАГСе и на банкете";

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

  const isNameValid = fullName.trim().split(/\s+/).length >= 2;
  console.log(isNameValid);
  const isFormValid =
    isNameValid &&
    presence &&
    (presence !== "На церемонии в ЗАГСе и на банкете" || transfer) &&
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
    <>
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
              checked={presence === "На церемонии в ЗАГСе и на банкете"}
              onChange={() => blockIfNoName(() => handlePresenceChange("На церемонии в ЗАГСе и на банкете"))}
            />
            <span className="w-[14px] h-[14px] rounded-full border border-primary-dark bg-transparent flex items-center justify-center">
            <span className={`w-[8px] h-[8px] rounded-full bg-primary-dark transition-transform ${presence === "На церемонии в ЗАГСе и на банкете" ? "scale-100" : "scale-0"}`} />
          </span>
            <span className="font-actay">На церемонии в ЗАГСе и на банкете</span>
          </label>

          <label className="group flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="presence-format"
              className="hidden"
              checked={presence === "Только на банкете"}
              onChange={() => blockIfNoName(() => handlePresenceChange("Только на банкете"))}

            />
            <span className="w-[14px] h-[14px] rounded-full border border-primary-dark bg-transparent flex items-center justify-center">
            <span className={`w-[8px] h-[8px] rounded-full bg-primary-dark transition-transform ${presence === "Только на банкете" ? "scale-100" : "scale-0"}`} />
          </span>
            <span className="font-actay">Только на банкете</span>
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


      <div className="relative flex justify-center">
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
          disabled={isSubmitting}
          className={`flex items-center justify-center gap-2 font-cormorant bg-primary-dark py-2 px-5 rounded-3xl uppercase text-white mt-10 transition-all ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-opacity-90"
          }`}
          onClick={async () => {
            if (!isFormValid) {
              setShowSubmitError(true);
              setTimeout(() => setShowSubmitError(false), 4000);
              return;
            }

            if (!trySubmit(fullName)) {
              alert("Вы уже отправили заполненную форму");
              return;
            }

            setIsSubmitting(true);

            try {
              const response = await fetch("/send-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              });

              const data = await response.json();

              if (response.ok) {
                setShowModal(true);
                console.log("Форма отправлена:", data);
              } else {
                alert("Ошибка при отправке формы: " + data.message);
              }
            } catch (error) {
              console.error("Ошибка запроса:", error);
              alert("Не удалось отправить форму. Попробуйте позже.");
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Отправка...
            </>
          ) : (
            "подтвердить присутствие"
          )}
        </button>


      </div>


      <img
        src="/images/rings-small.svg"
        alt=""
        data-aos="fade-up"
        className="max-w-[50px] mx-auto mt-2"
      />

    </form>
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
          onClick={() => setShowModal(false)} // клик по фону закрывает модалку
        >
          <div
            className="bg-primary-dark rounded-xl text-center max-w-[290px] w-full animate-fade-in relative"
            onClick={(e) => e.stopPropagation()} // предотвращаем закрытие при клике внутри окна
          >
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


    </>
  )
}

export default Form;