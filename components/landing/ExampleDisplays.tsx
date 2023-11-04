import ExampleApple from "./ExampleApple";
import ExampleBar from "./ExampleBar";
import ExampleDashboard from "./ExampleDashboard";
import ExampleFave from "./ExampleFave";

const ExampleDisplays = () => {
  return (
    <div className='flex justify-center gap-1 sm:gap-4 w-full p-2' >
      <div className="flex flex-col gap-1 sm:gap-4 w-1/2 sm:w-60">
        <ExampleDashboard />
        <ExampleFave />
      </div>
      <div className="flex flex-col gap-1 sm:gap-4 w-1/2 sm:w-60">
        <ExampleBar />
        <ExampleApple />
      </div>
    </div>
  )
}

export default ExampleDisplays;