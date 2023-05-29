import { ImageArr } from '../../models/Products';

interface iProps {
  imgArr: ImageArr[];
  remove: (index: number) => void;
}

export default function ImagesLayout(props: iProps) {
  return (
    <div className='grid grid-cols-6 gap-5 mt-10'>
      {props.imgArr.map((data, index) => {
        return (
          <div key={index} className='rounded shadow mx-5 h-[150px] w-full  bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url(${data.url})` }}>
            <div className='w-full h-full flex flex-col justify-end items-center'>
              <button className='rounded bg-slate-500 text-primary-900 p-1 mb-1' onClick={() => props.remove(index)}>
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
