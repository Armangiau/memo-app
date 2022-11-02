import { Component, ComponentProps } from 'solid-js';
import { useDragDropContext } from "@thisbeyond/solid-dnd";
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  createSortable,
  closestCenter,
} from "@thisbeyond/solid-dnd";
import { createSignal, For, lazy} from "solid-js";
import { useParams } from '@solidjs/router'
import PlusSVGlg from '../../ui/svg/plusSVGlg'
import DeleteQestRep from '../components/deleteQestRep'
import flashCardStore from '../flashCardStore'
import Input from '../../ui/data_input/input'
import Textarea from '../../ui/data_input/textarea'
import BtnCircle from '../../ui/actions/btnCircle'

interface sortableProps extends ComponentProps<any> {
  item: number,
  questionRéponse: {
    question: string
    réponse: string
  },
  store: flashCardStore,
  index: number
}

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      sortable: boolean;
    }
  }
}


const Sortable: Component<sortableProps> = (props: sortableProps) => {
  const sortable = createSortable(props.item);
  const [state] = useDragDropContext() ?? [null];
  const { question, réponse } = props.questionRéponse
  const store = props.store
  return (
    <div
      use:sortable
      class="sortable"
      classList={{
        "opacity-25": sortable.isActiveDraggable,
        "transition-transform": !!state?.active.draggable,
      }}
    >
      <Input
                  type='text'
                  class='input input-bordered input-primary w-full sm:w-4/5 mb-4 '
                  placeholder='question'
                  value={question}
                  onChange={evt => {
                    store.mise_à_jour_qest(props.index, evt.currentTarget.value)
                  }}
                />
                <DeleteQestRep
                  class='relative top-2 left-4'
                  store={store}
                  indexItemToDelete={props.index}
                />
                <Textarea
                  class='w-full sm:w-4/5 mb-4 ml-2 sm:ml-20'
                  color='secondary'
                  placeholder='réponse'
                  onChange={evt => {
                    store.mise_à_jour_rép(props.index, evt.currentTarget.value)
                  }}
                >
                  {réponse}
                </Textarea>
                <br />
    </div>
  );
}

export const SortableVerticalListExample = () => {

  const flashCardName = useParams().name
  const store = new flashCardStore(flashCardName)
  store.loadQuestionsRéponses()

  const questionsRéponses = store.passStore

  const [items, setItems] = createSignal([1, 2, 3]);
  const [activeItem, setActiveItem] = createSignal(null);

  const ids = () => questionsRéponses.length;

  const onDragStart = ({ draggable }) => setActiveItem(draggable.id);

  const onDragEnd = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const currentItems = ids();
      const fromIndex = currentItems.indexOf(draggable.id);
      const toIndex = currentItems.indexOf(droppable.id);
      if (fromIndex !== toIndex) {
        const updatedItems = currentItems.slice();
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
        setItems(updatedItems);
      }
    }
  };

  return (
    <DragDropProvider
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      collisionDetector={closestCenter}
    >
      <DragDropSensors />
      <div class="column self-stretch">
        <SortableProvider ids={ids()}>
          <For each={items()}>{(item) => <Sortable item={item} />}</For>
        </SortableProvider>
      </div>
      <DragOverlay>
        <div class="sortable">{activeItem()}</div>
      </DragOverlay>
    </DragDropProvider>
  );
};
