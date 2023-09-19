import styles from "@/styles/pages/lostWrite.module.css";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCat,
  faDog,
  faEllipsis,
  faMars,
  faQuestion,
  faVenus,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../form/Input";
import { IAnimalInfo } from "@/pages/lostWrite";
import IconSelectButton from "../form/IconSelectButton";

export default function AnimalInfo({
  values: { type, sex, neutered, name, age, weight, furColor, feature },
  onClick,
  onChange,
}: {
  values: IAnimalInfo;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <div className={styles.title}>아이의 정보를 알려주세요</div>
      <div className={styles.description}>
        아이의 정보가 정확할수록 효과적입니다. 아이를 잘 알아볼 수 있는 정보를
        기재해주세요.
      </div>
      <ul className={styles.list}>
        {/* 품종 */}
        <li className={styles.list_item}>
          <div className={styles.item_title}>품종을 알려주세요</div>
          <div className={styles.item_content}>
            <IconSelectButton
              id="type"
              value={type}
              onClick={onClick}
              list={[
                { data: "dog", name: "개", icon: faDog },
                { data: "cat", name: "고양이", icon: faCat },
                { data: "rest", name: "기타", icon: faEllipsis },
              ]}
            />
          </div>
        </li>

        {/* 성별 */}
        <li className={styles.list_item}>
          <div className={styles.item_title}>성별을 알려주세요</div>
          <div className={styles.item_content}>
            <IconSelectButton
              id="sex"
              value={sex}
              onClick={onClick}
              list={[
                { data: "boy", name: "남자", icon: faMars },
                { data: "girl", name: "여자", icon: faVenus },
                { data: "unknown", name: "모르겠어요", icon: faQuestion },
              ]}
            />
          </div>
        </li>

        {/* 중성화 여부 */}
        <li className={styles.list_item}>
          <div className={styles.item_title}>중성화 여부를 알려주세요</div>
          <div className={styles.item_content}>
            <IconSelectButton
              id="neutered"
              value={neutered}
              onClick={onClick}
              list={[
                { data: "Y", name: "했어요", icon: faCircle },
                { data: "N", name: "안했어요", icon: faX },
                { data: "U", name: "모르겠어요", icon: faQuestion },
              ]}
            />
          </div>
        </li>

        {/* 이름 */}
        <li className={styles.list_item}>
          <div className={styles.item_title}>아이 이름을 알려주세요</div>
          <div className={styles.item_content}>
            <Input id="name" value={name} onChange={onChange} />
          </div>
        </li>

        {/* 나이 */}
        <li className={styles.list_item}>
          <div className={styles.item_title}>나이를 알려주세요</div>
          <div className={styles.item_content}>
            <Input id="age" value={age} onChange={onChange} />
          </div>
          <div className={styles.short_description}>
            아직 돌이 지나지 않았다면 몇 개월인지, 지났다면 몇 살인지 정확하게
            써주세요!
          </div>
        </li>

        {/* 몸무게 */}
        <li className={styles.list_item}>
          <div className={styles.item_title}>몸무게를 알려주세요</div>
          <div className={styles.item_content}>
            <Input id="weight" value={weight} onChange={onChange} />
          </div>
          <div className={styles.short_description}>
            자세히 모른다면 추정 몸무게라도 알려주신다면 도움이 될거에요!
          </div>
        </li>

        {/* 털색 */}
        <li className={styles.list_item}>
          <div className={styles.item_title}>털색을 알려주세요</div>
          <div className={styles.item_content}>
            <Input id="furColor" value={furColor} onChange={onChange} />
          </div>
        </li>

        {/* 특징 */}
        <li className={styles.list_item}>
          <div className={styles.item_title}>특징을 알려주세요</div>
          <div className={styles.item_content}>
            <Input id="feature" value={feature} onChange={onChange} />
          </div>
          <div className={styles.short_description}>
            뒤에서 내용을 자세하게 쓸 수 있어요. 여기선 너무 자세하게 적지
            않아도 괜찮아요!
          </div>
        </li>

        {/* 사진 업로드 */}
        <li className={styles.list_item}>
          <div className={styles.item_title}>사진을 업로드해 주세요</div>
          <div className={styles.short_description}>
            사진은 5장까지 올릴 수 있어요. 최대한 많은 사진을 올려주세요!
          </div>
          <div className={styles.item_content}></div>
        </li>
      </ul>
    </>
  );
}
