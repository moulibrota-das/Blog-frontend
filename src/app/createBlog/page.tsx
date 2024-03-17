"use client"
import React, { useMemo, useEffect, useState, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);


const CreateBlogPage = ()=> {
  const [value, setValue] = useState('');
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
  ];

  const quill = useRef<any>();

    const modules = useMemo(
      () => ({
        imageResize: {
          parchment: Quill.import('parchment'),
          modules: ['Resize', 'DisplaySize']
       },
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' }
          ],
          ['link', 'image', 'video'],
          ['clean']
        ],
        clipboard: {
          matchVisual: true,
        },
      }),
      []
    );

  useEffect(()=>{
    console.log(value)
  },[value])
  

  return (
  <div className='px-2 py-3 h-screen'>
    <ReactQuill ref={(el) => (quill.current = el)} className='h-4/5' theme="snow" value={value} onChange={setValue} modules={modules} formats={formats}/>
  </div>);
}

export default CreateBlogPage