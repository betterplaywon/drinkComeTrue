import React, { useEffect, useCallback, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import * as AT from '../actionType';
import { backUrl } from '../config/config';

const PostForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [text, handleText, setText] = useInput('');

  const { TextArea } = Input;
  const { imagePaths, addPostLoading, addPostDone } = useSelector((state) => state.post);

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const handleSubmit = useCallback(() => {
    const formData = new FormData();
    imagePaths.forEach((m) => {
      formData.append('image', m);
    });
    formData.append('content', text);

    return dispatch({
      type: AT.ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: AT.IMAGE_UPLOAD_REQUEST,
      data: imageFormData,
    });
  }, []);

  const handleImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onRemoveImages = useCallback(
    (imageIdx) => () => {
      dispatch({
        type: AT.IMAGE_REMOVE,
        data: imageIdx,
      });
    },
    [],
  );

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data">
      <TextArea
        value={text}
        onChange={handleText}
        placeholder="글을 작성하고 마음 맞는 친구들과 술약속을 잡아봐요!"
        maxLength={100}
      />

      <div>
        <label>
          <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
          <Button onClick={handleImageUpload}>이미지 업로드</Button>
          <Button
            style={{ float: 'right', width: '25%', background: '#000000', color: 'white' }}
            htmlType="submit"
            onClick={handleSubmit}
            loading={addPostLoading}
          >
            작성
          </Button>
        </label>
      </div>

      <div style={{ background: '#fcfcfc61', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {imagePaths?.map((image, idx) => (
          <div key={image.id}>
            <img src={`${backUrl}/${image}`} alt="postImages" style={{ width: '25%', display: 'inline-block' }} />

            <div>
              <Button onClick={onRemoveImages(idx)}>사진 제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
