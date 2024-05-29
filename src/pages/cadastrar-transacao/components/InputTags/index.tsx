/* eslint-disable @typescript-eslint/ban-ts-comment */
import { toast } from 'sonner'
import { X } from '@phosphor-icons/react'
import { useRef, KeyboardEvent } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import styles from './styles.module.scss'

interface Tag {
  id: string
  name: string
}

export const InputTags = () => {
  const { control } = useFormContext()
  const { append, fields, remove } = useFieldArray({ name: 'tags', control })

  const tags = fields as Tag[]
  const inputTag = useRef<HTMLInputElement>(null)

  const onKeyDownTagName = (event: KeyboardEvent<HTMLInputElement>) => {
    const isEmptyValue = inputTag.current && inputTag.current.value === ''
    // TODO: Alterar para o evento do enter
    const isCreateTag = event.code === 'Comma'
    if (!isCreateTag || isEmptyValue) {
      return
    }

    if (fields.length >= 5) {
      toast.warning('Você atingiu o limite de 5 tags!')
      return
    }

    const tagName = inputTag?.current?.value
    const hasAlreadyCreated = tags.findIndex(tag => tag.name === tagName)

    if (hasAlreadyCreated === -1) {
      append({ name: tagName })
    } else {
      toast.error('Você já cadastrou essa tag!')
    }

    setTimeout(() => {
      // @ts-ignore
      inputTag.current.value = ''
    }, 100)
  }

  return (
    <fieldset className={styles.container}>
      <label htmlFor="tags">Tags</label>
      <div className={styles.content}>
        {tags.map((tag, index) => (
          <span key={tag.id} className={styles.tag}>
            {tag.name}
            <button type="button" onClick={() => remove(index)}>
              <X size={10} weight="bold" />
            </button>
          </span>
        ))}
        <input
          name="tags"
          ref={inputTag}
          maxLength={32}
          onKeyDown={onKeyDownTagName}
          placeholder="descreva o nome da tag"
        />
      </div>
    </fieldset>
  )
}
