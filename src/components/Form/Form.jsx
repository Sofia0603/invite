function Form(){
  return (
    <form>

      <div className="relative">
        {/* ERROR */}
        <div className="hidden absolute -top-[55px] left-[145px] p-1 rounded-lg bg-primary-dark max-w-[125px] text-[11px] text-white">
          сначала введите
          свое имя и фамилию
          <span
            className="absolute -bottom-[10px] left-[50px] w-0 h-0
        border-l-[10px] border-l-transparent
        border-r-[10px] border-r-transparent
        border-t-[10px] border-t-primary-dark"
          />
        </div>
        <input type="text" placeholder="Имя и фамилия"
          name="fullName"
          className="font-actay py-2 px-2 text-primary-dark border border-primary-dark rounded-lg text-center w-[226px]"
        />
      </div>


      <div className="bg-bg-extra-light rounded-lg mx-3 p-3 text-left mt-4">

        <div className="mb-3">
          <h3 className="font-mirra text-xl mb-3 ">Формат вашего присутствия</h3>

          <label className="group flex items-center gap-2 cursor-pointer">
            <input type="radio" name="presence-format" className="hidden" />
            <span className=" w-[14px] h-[14px] rounded-full border border-primary-dark bg-transparent flex items-center justify-center">
              <span className="w-[8px] h-[8px] rounded-full bg-primary-dark  scale-0 group-has-[input:checked]:scale-100  transition-transform" />
            </span>
            <span className="font-actay">на церемонии в ЗАГСе и на банкете</span>
          </label>
          <label className="group flex items-center gap-2 cursor-pointer">
            <input type="radio" name="presence-format" className="hidden" />
            <span className=" w-[14px] h-[14px] rounded-full border border-primary-dark bg-transparent flex items-center justify-center">
              <span className="w-[8px] h-[8px] rounded-full bg-primary-dark  scale-0 group-has-[input:checked]:scale-100  transition-transform" />
            </span>
            <span className="font-actay">только на банкете</span>
          </label>

        </div>


      </div>


    </form>
  )
}

export default Form;