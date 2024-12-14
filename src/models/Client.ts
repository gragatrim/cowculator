export interface ClientResponse {
  type: string;
  gameVersion: string;
  versionTimestamp: string;
  currentTimestamp: string;
  levelExperienceTable: number[];
  skillDetailMap: { [key: string]: ActionCategoryDetailMap };
  abilityDetailMap: { [key: string]: AbilityDetailMap };
  abilitySlotsLevelRequirementList: number[];
  itemDetailMap: { [key: string]: ItemDetail };
  itemCategoryDetailMap: ItemCategoryDetailMap;
  itemLocationDetailMap: { [key: string]: ItemLocationDetailMap };
  equipmentTypeDetailMap: { [key: string]: ActionCategoryDetailMap };
  combatStyleDetailMap: CombatStyleDetailMap;
  damageTypeDetailMap: DamageTypeDetailMap;
  combatMonsterDetailMap: { [key: string]: CombatMonsterDetailMap };
  combatTriggerDependencyDetailMap: CombatTriggerDependencyDetailMap;
  combatTriggerConditionDetailMap: { [key: string]: CombatTrigger };
  combatTriggerComparatorDetailMap: CombatTriggerComparatorDetailMap;
  enhancementLevelSuccessRateTable: number[];
  enhancementLevelTotalBonusMultiplierTable: number[];
  actionDetailMap: { [key: string]: ActionDetailMap };
  actionTypeDetailMap: { [key: string]: ActionTypeDetailMap };
  actionCategoryDetailMap: { [key: string]: ActionCategoryDetailMap };
  buffTypeDetailMap: { [key: string]: BuffTypeDetailMap };
  cowbellBundleDetailMap: { [key: string]: CowbellBundleDetailMap };
  buyableUpgradeDetailMap: { [key: string]: BuyableUpgradeDetailMap };
  chatIconDetailMap: { [key: string]: ChatIconDetailMap };
  communityBuffTypeDetailMap: CommunityBuffTypeDetailMap;
}

export interface AbilityDetailMap {
  hrid: string;
  name: string;
  description: string;
  manaCost: number;
  cooldownDuration: number;
  isSpecialAbility: boolean;
  abilityEffects: AbilityEffect[];
  defaultCombatTriggers: DefaultCombatTrigger[];
  sortIndex: number;
}

export interface AbilityEffect {
  targetType: TargetType;
  effectType: EffectType;
  combatStyleHrid: CombatStyleHrid;
  damageType: DamageType;
  baseDamageFlat: number;
  baseDamageFlatLevelBonus: number;
  baseDamageRatio: number;
  baseDamageRatioLevelBonus: number;
  bonusAccuracyRatio: number;
  bonusAccuracyRatioLevelBonus: number;
  damageOverTimeRatio: number;
  damageOverTimeDuration: number;
  stunChance: number;
  stunDuration: number;
  buffs: Buff[] | null;
}

export interface Buff {
  uniqueHrid: string;
  typeHrid: string;
  ratioBoost: number;
  ratioBoostLevelBonus: number;
  flatBoost: number;
  flatBoostLevelBonus: number;
  startTime: string;
  duration: number;
}

export enum CombatStyleHrid {
  CombatStylesMagic = "/combat_styles/magic",
  CombatStylesRanged = "/combat_styles/ranged",
  CombatStylesSlash = "/combat_styles/slash",
  CombatStylesSmash = "/combat_styles/smash",
  CombatStylesStab = "/combat_styles/stab",
  Empty = "",
}

export enum DamageType {
  DamageTypesFire = "/damage_types/fire",
  DamageTypesNature = "/damage_types/nature",
  DamageTypesPhysical = "/damage_types/physical",
  DamageTypesWater = "/damage_types/water",
  Empty = "",
}

export enum EffectType {
  AbilityEffectTypesBuff = "/ability_effect_types/buff",
  AbilityEffectTypesDamage = "/ability_effect_types/damage",
  AbilityEffectTypesHeal = "/ability_effect_types/heal",
}

export enum TargetType {
  AllEnemies = "all enemies",
  Enemy = "enemy",
  Self = "self",
}

export interface DefaultCombatTrigger {
  dependencyHrid: DependencyHrid;
  conditionHrid: string;
  comparatorHrid: ComparatorHrid;
  value: number;
}

export enum ComparatorHrid {
  CombatTriggerComparatorsGreaterThanEqual =
  "/combat_trigger_comparators/greater_than_equal",
  CombatTriggerComparatorsIsActive = "/combat_trigger_comparators/is_active",
  CombatTriggerComparatorsIsInactive =
  "/combat_trigger_comparators/is_inactive",
  CombatTriggerComparatorsLessThanEqual =
  "/combat_trigger_comparators/less_than_equal",
}

export enum DependencyHrid {
  CombatTriggerDependenciesAllEnemies =
  "/combat_trigger_dependencies/all_enemies",
  CombatTriggerDependenciesSelf = "/combat_trigger_dependencies/self",
  CombatTriggerDependenciesTargetedEnemy =
  "/combat_trigger_dependencies/targeted_enemy",
}

export interface ActionTypeDetailMap {
  hrid: string;
  name: string;
  sortIndex: number;
}

export interface ActionCategoryDetailMap {
  hrid: string;
  name: string;
  sortIndex: number;
  allowValue?: boolean;
  itemLocationHrid?: string;
  pluralName?: string;
}

export interface ActionDetailMap {
  hrid: string;
  function: ActionFunction;
  type: ActionType;
  category: string;
  name: string;
  levelRequirement: LevelRequirement;
  baseTimeCost: number;
  experienceGain: ExperienceGain;
  dropTable: DropTable[] | null;
  rareDropTable: DropTable[] | null;
  upgradeItemHrid: string;
  inputItems: Cost[] | null;
  outputItems: Cost[] | null;
  combatZoneInfo: CombatZoneInfo | null;
  sortIndex: number;
}

export interface DropTable {
  itemHrid: string;
  dropRate: number;
  minCount: number;
  maxCount: number;
  minEliteTier: number;
}

export interface ExperienceGain {
  skillHrid: SkillHrid;
  value: number;
}

export enum SkillHrid {
  Empty = "",
  SkillsAttack = "/skills/attack",
  SkillsBrewing = "/skills/brewing",
  SkillsCheesesmithing = "/skills/cheesesmithing",
  SkillsCooking = "/skills/cooking",
  SkillsCrafting = "/skills/crafting",
  SkillsDefense = "/skills/defense",
  SkillsEnhancing = "/skills/enhancing",
  SkillsForaging = "/skills/foraging",
  SkillsIntelligence = "/skills/intelligence",
  SkillsMagic = "/skills/magic",
  SkillsMilking = "/skills/milking",
  SkillsPower = "/skills/power",
  SkillsRanged = "/skills/ranged",
  SkillsTailoring = "/skills/tailoring",
  SkillsWoodcutting = "/skills/woodcutting",
}

export enum ActionFunction {
  Combat = "/action_functions/combat",
  Enhancing = "/action_functions/enhancing",
  Gathering = "/action_functions/gathering",
  Production = "/action_functions/production",
}

export interface Cost {
  itemHrid: string;
  count: number;
}

export interface LevelRequirement {
  skillHrid: SkillHrid;
  level: number;
}

export interface CombatZoneInfo {
  fightInfo: FightInfo;
}

export interface FightInfo {
  randomSpawnInfo: RandomSpawnInfo;
}

export interface RandomSpawnInfo {
  maxSpawnCount: number;
  maxTotalStrength: number;
  spawns: Spawn[] | null;
}

export interface Spawn {
  combatMonsterHrid: string;
  rate: number;
  strength: number;
}

export enum ActionType {
  Brewing = "/action_types/brewing",
  Cheesesmithing = "/action_types/cheesesmithing",
  Combat = "/action_types/combat",
  Cooking = "/action_types/cooking",
  Crafting = "/action_types/crafting",
  Enhancing = "/action_types/enhancing",
  Foraging = "/action_types/foraging",
  Milking = "/action_types/milking",
  Tailoring = "/action_types/tailoring",
  Woodcutting = "/action_types/woodcutting",
}

export interface BuffTypeDetailMap {
  hrid: string;
  isCombat: boolean;
  name: string;
  description: string;
  debuffDescription: string;
  sortIndex: number;
}

export interface BuyableUpgradeDetailMap {
  hrid: string;
  name: Name;
  cost: Cost;
  hasBuyLimit: boolean;
  buyLimit: number;
  offlineHourCount: number;
  marketListingCount: number;
  actionQueueCount: number;
  sortIndex: number;
}

export enum Name {
  The1ActionQueue = "+1 Action Queue",
  The1HourOfflineProgress = "+1 Hour Offline Progress",
  The1MarketListing = "+1 Market Listing",
}

export interface ChatIconDetailMap {
  hrid: string;
  name: string;
  isSpecial: boolean;
  cowbellCost: number;
  sortIndex: number;
}

export interface CombatMonsterDetailMap {
  hrid: string;
  name: string;
  combatDetails: CombatDetails;
  abilities: Ability[];
  dropTable: DropTable[] | null;
  rareDropTable: DropTable[] | null;
}

export interface Ability {
  abilityHrid: string;
  level: number;
}

export interface CombatDetails {
  currentHitpoints: number;
  maxHitpoints: number;
  currentManapoints: number;
  maxManapoints: number;
  stabAccuracyRating: number;
  slashAccuracyRating: number;
  smashAccuracyRating: number;
  rangedAccuracyRating: number;
  stabMaxDamage: number;
  slashMaxDamage: number;
  smashMaxDamage: number;
  rangedMaxDamage: number;
  magicMaxDamage: number;
  stabEvasionRating: number;
  slashEvasionRating: number;
  smashEvasionRating: number;
  rangedEvasionRating: number;
  totalArmor: number;
  totalWaterResistance: number;
  totalNatureResistance: number;
  totalFireResistance: number;
  combatLevel: number;
  staminaLevel: number;
  intelligenceLevel: number;
  attackLevel: number;
  powerLevel: number;
  defenseLevel: number;
  rangedLevel: number;
  magicLevel: number;
  combatStats: Combat;
}

export interface Combat {
  combatStyleHrids: CombatStyleHrid[] | null;
  damageType: DamageType;
  attackInterval: number;
  criticalRate: number;
  criticalDamage: number;
  stabAccuracy: number;
  slashAccuracy: number;
  smashAccuracy: number;
  rangedAccuracy: number;
  stabDamage: number;
  slashDamage: number;
  smashDamage: number;
  rangedDamage: number;
  magicDamage: number;
  physicalAmplify: number;
  waterAmplify: number;
  natureAmplify: number;
  fireAmplify: number;
  healingAmplify: number;
  physicalReflectPower: number;
  maxHitpoints: number;
  maxManapoints: number;
  stabEvasion: number;
  slashEvasion: number;
  smashEvasion: number;
  rangedEvasion: number;
  armor: number;
  waterResistance: number;
  natureResistance: number;
  fireResistance: number;
  lifeSteal: number;
  HPRegen: number;
  MPRegen: number;
  combatDropRate: number;
  combatDropQuantity: number;
  combatRareFind: number;
  combatExperience: number;
  foodSlots: number;
  drinkSlots: number;
}

export interface CombatStyleDetailMap {
  "/combat_styles/heal": CombatStylesHeal;
  "/combat_styles/magic": CombatStylesHeal;
  "/combat_styles/ranged": CombatStylesHeal;
  "/combat_styles/slash": CombatStylesHeal;
  "/combat_styles/smash": CombatStylesHeal;
  "/combat_styles/stab": CombatStylesHeal;
}

export interface CombatStylesHeal {
  hrid: string;
  name: string;
}

export interface CombatTriggerComparatorDetailMap {
  "/combat_trigger_comparators/greater_than_equal": ActionCategoryDetailMap;
  "/combat_trigger_comparators/is_active": ActionCategoryDetailMap;
  "/combat_trigger_comparators/is_inactive": ActionCategoryDetailMap;
  "/combat_trigger_comparators/less_than_equal": ActionCategoryDetailMap;
}

export interface CombatTrigger {
  hrid: string;
  name: string;
  isSingleTarget: boolean;
  isMultiTarget: boolean;
  allowedComparatorHrids?: ComparatorHrid[];
  sortIndex: number;
}

export interface CombatTriggerDependencyDetailMap {
  "/combat_trigger_dependencies/all_allies": CombatTrigger;
  "/combat_trigger_dependencies/all_enemies": CombatTrigger;
  "/combat_trigger_dependencies/self": CombatTrigger;
  "/combat_trigger_dependencies/targeted_enemy": CombatTrigger;
}

export interface CommunityBuffTypeDetailMap {
  "/community_buff_types/combat_drop_quantity":
  CommunityBuffTypesCombatDropQuantity;
  "/community_buff_types/enhancing_speed": CommunityBuffTypesEnhancingSpeed;
  "/community_buff_types/experience": CommunityBuffTypesExperience;
  "/community_buff_types/gathering_quantity":
  CommunityBuffTypesGatheringQuantity;
  "/community_buff_types/production_efficiency":
  CommunityBuffTypesProductionEfficiency;
}

export interface CommunityBuffTypesCombatDropQuantity {
  hrid: string;
  name: string;
  usableInActionTypeMap:
  CommunityBuffTypesCombatDropQuantityUsableInActionTypeMap;
  buff: Buff;
  description: string;
  cowbellCost: number;
  sortIndex: number;
}

export interface CommunityBuffTypesCombatDropQuantityUsableInActionTypeMap {
  "/action_types/combat": boolean;
}

export interface CommunityBuffTypesEnhancingSpeed {
  hrid: string;
  name: string;
  usableInActionTypeMap: CommunityBuffTypesEnhancingSpeedUsableInActionTypeMap;
  buff: Buff;
  description: string;
  cowbellCost: number;
  sortIndex: number;
}

export interface CommunityBuffTypesEnhancingSpeedUsableInActionTypeMap {
  "/action_types/enhancing": boolean;
}

export interface CommunityBuffTypesExperience {
  hrid: string;
  name: string;
  usableInActionTypeMap: { [key: string]: boolean };
  buff: Buff;
  description: string;
  cowbellCost: number;
  sortIndex: number;
}

export interface CommunityBuffTypesGatheringQuantity {
  hrid: string;
  name: string;
  usableInActionTypeMap:
  CommunityBuffTypesGatheringQuantityUsableInActionTypeMap;
  buff: Buff;
  description: string;
  cowbellCost: number;
  sortIndex: number;
}

export interface CommunityBuffTypesGatheringQuantityUsableInActionTypeMap {
  "/action_types/foraging": boolean;
  "/action_types/milking": boolean;
  "/action_types/woodcutting": boolean;
}

export interface CommunityBuffTypesProductionEfficiency {
  hrid: string;
  name: string;
  usableInActionTypeMap:
  CommunityBuffTypesProductionEfficiencyUsableInActionTypeMap;
  buff: Buff;
  description: string;
  cowbellCost: number;
  sortIndex: number;
}

export interface CommunityBuffTypesProductionEfficiencyUsableInActionTypeMap {
  "/action_types/brewing": boolean;
  "/action_types/cheesesmithing": boolean;
  "/action_types/cooking": boolean;
  "/action_types/crafting": boolean;
  "/action_types/tailoring": boolean;
}

export interface CowbellBundleDetailMap {
  id: string;
  name: string;
  quantity: number;
  dollarPrice: number;
  sortIndex: number;
}

export interface DamageTypeDetailMap {
  "/damage_types/fire": CombatStylesHeal;
  "/damage_types/nature": CombatStylesHeal;
  "/damage_types/physical": CombatStylesHeal;
  "/damage_types/water": CombatStylesHeal;
}

export interface ItemCategoryDetailMap {
  "/item_categories/ability_book": ActionCategoryDetailMap;
  "/item_categories/currency": ActionCategoryDetailMap;
  "/item_categories/drink": ActionCategoryDetailMap;
  "/item_categories/equipment": ActionCategoryDetailMap;
  "/item_categories/food": ActionCategoryDetailMap;
  "/item_categories/loot": ActionCategoryDetailMap;
  "/item_categories/resource": ActionCategoryDetailMap;
}

export interface ItemDetailMap {
  "/items/abyssal_essence": ItemResource;
  "/items/acrobatic_hood": ItemEquipment;
  "/items/acrobats_ribbon": ItemResource;
  "/items/advanced_task_badge": ItemEquipment;
  "/items/alchemy_essence": ItemResource;
  "/items/alchemy_tea": BeijingPigeon;
  "/items/amber": ItemResource;
  "/items/amethyst": ItemResource;
  "/items/apple": ItemResource;
  "/items/apple_gummy": ItemFoodDrink;
  "/items/apple_yogurt": ItemFoodDrink;
  "/items/aqua_arrow": ItemBook;
  "/items/aqua_aura": ItemBook;
  "/items/aqua_essence": ItemResource;
  "/items/arabica_coffee_bean": ItemResource;
  "/items/arcane_bow": ItemEquipment;
  "/items/arcane_crossbow": ItemEquipment;
  "/items/arcane_fire_staff": ItemEquipment;
  "/items/arcane_log": ItemResource;
  "/items/arcane_lumber": ItemResource;
  "/items/arcane_nature_staff": ItemEquipment;
  "/items/arcane_reflection": ItemBook;
  "/items/arcane_shield": ItemEquipment;
  "/items/arcane_water_staff": ItemEquipment;
  "/items/artisan_tea": BeijingPigeon;
  "/items/attack_coffee": BeijingPigeon;
  "/items/azure_alembic": ItemEquipment;
  "/items/azure_boots": ItemEquipment;
  "/items/azure_brush": ItemEquipment;
  "/items/azure_buckler": ItemEquipment;
  "/items/azure_bulwark": ItemEquipment;
  "/items/azure_cheese": ItemResource;
  "/items/azure_chisel": ItemEquipment;
  "/items/azure_enhancer": ItemEquipment;
  "/items/azure_gauntlets": ItemEquipment;
  "/items/azure_hammer": ItemEquipment;
  "/items/azure_hatchet": ItemEquipment;
  "/items/azure_helmet": ItemEquipment;
  "/items/azure_mace": ItemEquipment;
  "/items/azure_milk": ItemResource;
  "/items/azure_needle": ItemEquipment;
  "/items/azure_plate_body": ItemEquipment;
  "/items/azure_plate_legs": ItemEquipment;
  "/items/azure_pot": ItemEquipment;
  "/items/azure_shears": ItemEquipment;
  "/items/azure_spatula": ItemEquipment;
  "/items/azure_spear": ItemEquipment;
  "/items/azure_sword": ItemEquipment;
  "/items/bag_of_10_cowbells": ItemLoot;
  "/items/bamboo_boots": ItemEquipment;
  "/items/bamboo_branch": ItemResource;
  "/items/bamboo_fabric": ItemResource;
  "/items/bamboo_gloves": ItemEquipment;
  "/items/bamboo_hat": ItemEquipment;
  "/items/bamboo_robe_bottoms": ItemEquipment;
  "/items/bamboo_robe_top": ItemEquipment;
  "/items/basic_task_badge": ItemEquipment;
  "/items/bear_essence": ItemResource;
  "/items/beast_boots": ItemEquipment;
  "/items/beast_bracers": ItemEquipment;
  "/items/beast_chaps": ItemEquipment;
  "/items/beast_hide": ItemResource;
  "/items/beast_hood": ItemEquipment;
  "/items/beast_leather": ItemResource;
  "/items/beast_tunic": ItemEquipment;
  "/items/berserk": ItemBook;
  "/items/birch_bow": ItemEquipment;
  "/items/birch_crossbow": ItemEquipment;
  "/items/birch_fire_staff": ItemEquipment;
  "/items/birch_log": ItemResource;
  "/items/birch_lumber": ItemResource;
  "/items/birch_nature_staff": ItemEquipment;
  "/items/birch_shield": ItemEquipment;
  "/items/birch_water_staff": ItemEquipment;
  "/items/bishops_codex": ItemEquipment;
  "/items/bishops_scroll": ItemResource;
  "/items/black_bear_fluff": ItemResource;
  "/items/black_bear_shoes": ItemEquipment;
  "/items/black_tea_leaf": ItemResource;
  "/items/blackberry": ItemResource;
  "/items/blackberry_cake": ItemFoodDrink;
  "/items/blackberry_donut": ItemFoodDrink;
  "/items/blessed_tea": BeijingPigeon;
  "/items/blue_key_fragment": ItemKey;
  "/items/blueberry": ItemResource;
  "/items/blueberry_cake": ItemFoodDrink;
  "/items/blueberry_donut": ItemFoodDrink;
  "/items/brewing_essence": ItemResource;
  "/items/brewing_tea": BeijingPigeon;
  "/items/brown_key_fragment": ItemKey;
  "/items/burble_alembic": ItemEquipment;
  "/items/burble_boots": ItemEquipment;
  "/items/burble_brush": ItemEquipment;
  "/items/burble_buckler": ItemEquipment;
  "/items/burble_bulwark": ItemEquipment;
  "/items/burble_cheese": ItemResource;
  "/items/burble_chisel": ItemEquipment;
  "/items/burble_enhancer": ItemEquipment;
  "/items/burble_gauntlets": ItemEquipment;
  "/items/burble_hammer": ItemEquipment;
  "/items/burble_hatchet": ItemEquipment;
  "/items/burble_helmet": ItemEquipment;
  "/items/burble_mace": ItemEquipment;
  "/items/burble_milk": ItemResource;
  "/items/burble_needle": ItemEquipment;
  "/items/burble_plate_body": ItemEquipment;
  "/items/burble_plate_legs": ItemEquipment;
  "/items/burble_pot": ItemEquipment;
  "/items/burble_shears": ItemEquipment;
  "/items/burble_spatula": ItemEquipment;
  "/items/burble_spear": ItemEquipment;
  "/items/burble_sword": ItemEquipment;
  "/items/burble_tea_leaf": ItemResource;
  "/items/burning_key_fragment": ItemKey;
  "/items/catalyst_of_coinification": ItemResource;
  "/items/catalyst_of_decomposition": ItemResource;
  "/items/catalyst_of_transmutation": ItemResource;
  "/items/catalytic_tea": BeijingPigeon;
  "/items/cedar_bow": ItemEquipment;
  "/items/cedar_crossbow": ItemEquipment;
  "/items/cedar_fire_staff": ItemEquipment;
  "/items/cedar_log": ItemResource;
  "/items/cedar_lumber": ItemResource;
  "/items/cedar_nature_staff": ItemEquipment;
  "/items/cedar_shield": ItemEquipment;
  "/items/cedar_water_staff": ItemEquipment;
  "/items/centaur_boots": ItemEquipment;
  "/items/centaur_hoof": ItemResource;
  "/items/channeling_coffee": BeijingPigeon;
  "/items/chaotic_chain": ItemResource;
  "/items/chaotic_flail": ItemEquipment;
  "/items/cheese": ItemResource;
  "/items/cheese_alembic": ItemEquipment;
  "/items/cheese_boots": ItemEquipment;
  "/items/cheese_brush": ItemEquipment;
  "/items/cheese_buckler": ItemEquipment;
  "/items/cheese_bulwark": ItemEquipment;
  "/items/cheese_chisel": ItemEquipment;
  "/items/cheese_enhancer": ItemEquipment;
  "/items/cheese_gauntlets": ItemEquipment;
  "/items/cheese_hammer": ItemEquipment;
  "/items/cheese_hatchet": ItemEquipment;
  "/items/cheese_helmet": ItemEquipment;
  "/items/cheese_mace": ItemEquipment;
  "/items/cheese_needle": ItemEquipment;
  "/items/cheese_plate_body": ItemEquipment;
  "/items/cheese_plate_legs": ItemEquipment;
  "/items/cheese_pot": ItemEquipment;
  "/items/cheese_shears": ItemEquipment;
  "/items/cheese_spatula": ItemEquipment;
  "/items/cheese_spear": ItemEquipment;
  "/items/cheese_sword": ItemEquipment;
  "/items/cheesesmithing_essence": ItemResource;
  "/items/cheesesmithing_tea": BeijingPigeon;
  "/items/chimerical_chest": ItemLoot;
  "/items/chimerical_chest_key": ItemKey;
  "/items/chimerical_entry_key": ItemKey;
  "/items/chimerical_essence": ItemResource;
  "/items/chimerical_quiver": ItemEquipment;
  "/items/chimerical_token": ItemCurrency;
  "/items/chrono_gloves": ItemEquipment;
  "/items/chrono_sphere": ItemResource;
  "/items/cleave": ItemBook;
  "/items/cocoon": ItemResource;
  "/items/coin": ItemCurrency;
  "/items/collectors_boots": ItemEquipment;
  "/items/colossus_core": ItemResource;
  "/items/colossus_plate_body": ItemEquipment;
  "/items/colossus_plate_legs": ItemEquipment;
  "/items/cooking_essence": ItemResource;
  "/items/cooking_tea": BeijingPigeon;
  "/items/cotton": ItemResource;
  "/items/cotton_boots": ItemEquipment;
  "/items/cotton_fabric": ItemResource;
  "/items/cotton_gloves": ItemEquipment;
  "/items/cotton_hat": ItemEquipment;
  "/items/cotton_robe_bottoms": ItemEquipment;
  "/items/cotton_robe_top": ItemEquipment;
  "/items/cowbell": ItemCurrency;
  "/items/crab_pincer": ItemResource;
  "/items/crafting_essence": ItemResource;
  "/items/crafting_tea": BeijingPigeon;
  "/items/crimson_alembic": ItemEquipment;
  "/items/crimson_boots": ItemEquipment;
  "/items/crimson_brush": ItemEquipment;
  "/items/crimson_buckler": ItemEquipment;
  "/items/crimson_bulwark": ItemEquipment;
  "/items/crimson_cheese": ItemResource;
  "/items/crimson_chisel": ItemEquipment;
  "/items/crimson_enhancer": ItemEquipment;
  "/items/crimson_gauntlets": ItemEquipment;
  "/items/crimson_hammer": ItemEquipment;
  "/items/crimson_hatchet": ItemEquipment;
  "/items/crimson_helmet": ItemEquipment;
  "/items/crimson_mace": ItemEquipment;
  "/items/crimson_milk": ItemResource;
  "/items/crimson_needle": ItemEquipment;
  "/items/crimson_plate_body": ItemEquipment;
  "/items/crimson_plate_legs": ItemEquipment;
  "/items/crimson_pot": ItemEquipment;
  "/items/crimson_shears": ItemEquipment;
  "/items/crimson_spatula": ItemEquipment;
  "/items/crimson_spear": ItemEquipment;
  "/items/crimson_sword": ItemEquipment;
  "/items/crippling_slash": ItemBook;
  "/items/critical_aura": ItemBook;
  "/items/critical_coffee": BeijingPigeon;
  "/items/crushed_amber": ItemResource;
  "/items/crushed_amethyst": ItemResource;
  "/items/crushed_garnet": ItemResource;
  "/items/crushed_jade": ItemResource;
  "/items/crushed_moonstone": ItemResource;
  "/items/crushed_pearl": ItemResource;
  "/items/crushed_philosophers_stone": ItemResource;
  "/items/crushed_sunstone": ItemResource;
  "/items/cupcake": ItemFoodDrink;
  "/items/cursed_ball": ItemResource;
  "/items/cursed_bow": ItemEquipment;
  "/items/dark_key_fragment": ItemKey;
  "/items/defense_coffee": BeijingPigeon;
  "/items/demonic_core": ItemResource;
  "/items/demonic_plate_body": ItemEquipment;
  "/items/demonic_plate_legs": ItemEquipment;
  "/items/dodocamel_gauntlets": ItemEquipment;
  "/items/dodocamel_plume": ItemResource;
  "/items/donut": ItemFoodDrink;
  "/items/dragon_fruit": ItemResource;
  "/items/dragon_fruit_gummy": ItemFoodDrink;
  "/items/dragon_fruit_yogurt": ItemFoodDrink;
  "/items/earrings_of_armor": ItemEquipment;
  "/items/earrings_of_critical_strike": ItemEquipment;
  "/items/earrings_of_essence_find": ItemEquipment;
  "/items/earrings_of_gathering": ItemEquipment;
  "/items/earrings_of_rare_find": ItemEquipment;
  "/items/earrings_of_regeneration": ItemEquipment;
  "/items/earrings_of_resistance": ItemEquipment;
  "/items/efficiency_tea": BeijingPigeon;
  "/items/egg": ItemResource;
  "/items/elemental_affinity": ItemBook;
  "/items/elusiveness": ItemBook;
  "/items/emp_tea_leaf": ItemResource;
  "/items/enchanted_chest": ItemLoot;
  "/items/enchanted_chest_key": ItemKey;
  "/items/enchanted_cloak": ItemEquipment;
  "/items/enchanted_entry_key": ItemKey;
  "/items/enchanted_essence": ItemResource;
  "/items/enchanted_gloves": ItemEquipment;
  "/items/enchanted_token": ItemCurrency;
  "/items/enhancing_essence": ItemResource;
  "/items/enhancing_tea": BeijingPigeon;
  "/items/entangle": ItemBook;
  "/items/excelsa_coffee_bean": ItemResource;
  "/items/expert_task_badge": ItemEquipment;
  "/items/eye_of_the_watcher": ItemResource;
  "/items/eye_watch": ItemEquipment;
  "/items/eyessence": ItemResource;
  "/items/fierce_aura": ItemBook;
  "/items/fieriosa_coffee_bean": ItemResource;
  "/items/fighter_necklace": ItemEquipment;
  "/items/fireball": ItemBook;
  "/items/firestorm": ItemBook;
  "/items/flame_arrow": ItemBook;
  "/items/flame_aura": ItemBook;
  "/items/flame_blast": ItemBook;
  "/items/flaming_cloth": ItemResource;
  "/items/flaming_robe_bottoms": ItemEquipment;
  "/items/flaming_robe_top": ItemEquipment;
  "/items/flax": ItemResource;
  "/items/fluffy_red_hat": ItemEquipment;
  "/items/foraging_essence": ItemResource;
  "/items/foraging_tea": BeijingPigeon;
  "/items/frenzy": ItemBook;
  "/items/frost_sphere": ItemResource;
  "/items/frost_staff": ItemEquipment;
  "/items/frost_surge": ItemBook;
  "/items/garnet": ItemResource;
  "/items/gathering_tea": BeijingPigeon;
  "/items/gator_vest": ItemEquipment;
  "/items/giant_pouch": ItemEquipment;
  "/items/ginkgo_bow": ItemEquipment;
  "/items/ginkgo_crossbow": ItemEquipment;
  "/items/ginkgo_fire_staff": ItemEquipment;
  "/items/ginkgo_log": ItemResource;
  "/items/ginkgo_lumber": ItemResource;
  "/items/ginkgo_nature_staff": ItemEquipment;
  "/items/ginkgo_shield": ItemEquipment;
  "/items/ginkgo_water_staff": ItemEquipment;
  "/items/gluttonous_energy": ItemResource;
  "/items/gluttonous_pouch": ItemEquipment;
  "/items/gobo_boomstick": ItemEquipment;
  "/items/gobo_boots": ItemEquipment;
  "/items/gobo_bracers": ItemEquipment;
  "/items/gobo_chaps": ItemEquipment;
  "/items/gobo_defender": ItemEquipment;
  "/items/gobo_essence": ItemResource;
  "/items/gobo_hide": ItemResource;
  "/items/gobo_hood": ItemEquipment;
  "/items/gobo_leather": ItemResource;
  "/items/gobo_rag": ItemResource;
  "/items/gobo_shooter": ItemEquipment;
  "/items/gobo_slasher": ItemEquipment;
  "/items/gobo_smasher": ItemEquipment;
  "/items/gobo_stabber": ItemEquipment;
  "/items/gobo_tunic": ItemEquipment;
  "/items/goggles": ItemResource;
  "/items/golem_essence": ItemResource;
  "/items/gourmet_tea": BeijingPigeon;
  "/items/granite_bludgeon": ItemEquipment;
  "/items/green_key_fragment": ItemKey;
  "/items/green_tea_leaf": ItemResource;
  "/items/griffin_bulwark": ItemEquipment;
  "/items/griffin_chaps": ItemEquipment;
  "/items/griffin_leather": ItemResource;
  "/items/griffin_talon": ItemResource;
  "/items/griffin_tunic": ItemEquipment;
  "/items/grizzly_bear_fluff": ItemResource;
  "/items/grizzly_bear_shoes": ItemEquipment;
  "/items/gummy": ItemFoodDrink;
  "/items/guzzling_energy": ItemResource;
  "/items/guzzling_pouch": ItemEquipment;
  "/items/heal": ItemBook;
  "/items/holy_alembic": ItemEquipment;
  "/items/holy_boots": ItemEquipment;
  "/items/holy_brush": ItemEquipment;
  "/items/holy_buckler": ItemEquipment;
  "/items/holy_bulwark": ItemEquipment;
  "/items/holy_cheese": ItemResource;
  "/items/holy_chisel": ItemEquipment;
  "/items/holy_enhancer": ItemEquipment;
  "/items/holy_gauntlets": ItemEquipment;
  "/items/holy_hammer": ItemEquipment;
  "/items/holy_hatchet": ItemEquipment;
  "/items/holy_helmet": ItemEquipment;
  "/items/holy_mace": ItemEquipment;
  "/items/holy_milk": ItemResource;
  "/items/holy_needle": ItemEquipment;
  "/items/holy_plate_body": ItemEquipment;
  "/items/holy_plate_legs": ItemEquipment;
  "/items/holy_pot": ItemEquipment;
  "/items/holy_shears": ItemEquipment;
  "/items/holy_spatula": ItemEquipment;
  "/items/holy_spear": ItemEquipment;
  "/items/holy_sword": ItemEquipment;
  "/items/ice_spear": ItemBook;
  "/items/icy_cloth": ItemResource;
  "/items/icy_robe_bottoms": ItemEquipment;
  "/items/icy_robe_top": ItemEquipment;
  "/items/impale": ItemBook;
  "/items/infernal_battlestaff": ItemEquipment;
  "/items/infernal_ember": ItemResource;
  "/items/insanity": ItemBook;
  "/items/intelligence_coffee": BeijingPigeon;
  "/items/invincible": ItemBook;
  "/items/jackalope_antler": ItemResource;
  "/items/jackalope_staff": ItemEquipment;
  "/items/jade": ItemResource;
  "/items/jungle_essence": ItemResource;
  "/items/knights_aegis": ItemEquipment;
  "/items/knights_ingot": ItemResource;
  "/items/large_artisans_crate": ItemLoot;
  "/items/large_meteorite_cache": ItemLoot;
  "/items/large_pouch": ItemEquipment;
  "/items/large_treasure_chest": ItemLoot;
  "/items/liberica_coffee_bean": ItemResource;
  "/items/linen_boots": ItemEquipment;
  "/items/linen_fabric": ItemResource;
  "/items/linen_gloves": ItemEquipment;
  "/items/linen_hat": ItemEquipment;
  "/items/linen_robe_bottoms": ItemEquipment;
  "/items/linen_robe_top": ItemEquipment;
  "/items/living_granite": ItemResource;
  "/items/log": ItemResource;
  "/items/lucky_coffee": BeijingPigeon;
  "/items/lumber": ItemResource;
  "/items/luna_robe_bottoms": ItemEquipment;
  "/items/luna_robe_top": ItemEquipment;
  "/items/luna_wing": ItemResource;
  "/items/magic_coffee": BeijingPigeon;
  "/items/magicians_cloth": ItemResource;
  "/items/magicians_hat": ItemEquipment;
  "/items/magnet": ItemResource;
  "/items/magnetic_gloves": ItemEquipment;
  "/items/magnifying_glass": ItemResource;
  "/items/maim": ItemBook;
  "/items/mana_spring": ItemBook;
  "/items/manticore_shield": ItemEquipment;
  "/items/manticore_sting": ItemResource;
  "/items/marine_chaps": ItemEquipment;
  "/items/marine_scale": ItemResource;
  "/items/marine_tunic": ItemEquipment;
  "/items/marsberry": ItemResource;
  "/items/marsberry_cake": ItemFoodDrink;
  "/items/marsberry_donut": ItemFoodDrink;
  "/items/medium_artisans_crate": ItemLoot;
  "/items/medium_meteorite_cache": ItemLoot;
  "/items/medium_pouch": ItemEquipment;
  "/items/medium_treasure_chest": ItemLoot;
  "/items/milk": ItemResource;
  "/items/milking_essence": ItemResource;
  "/items/milking_tea": BeijingPigeon;
  "/items/minor_heal": ItemBook;
  "/items/mirror_of_protection": ItemResource;
  "/items/mooberry": ItemResource;
  "/items/mooberry_cake": ItemFoodDrink;
  "/items/mooberry_donut": ItemFoodDrink;
  "/items/moolong_tea_leaf": ItemResource;
  "/items/moonstone": ItemResource;
  "/items/natures_veil": ItemBook;
  "/items/necklace_of_efficiency": ItemEquipment;
  "/items/necklace_of_speed": ItemEquipment;
  "/items/necklace_of_wisdom": ItemEquipment;
  "/items/orange": ItemResource;
  "/items/orange_gummy": ItemFoodDrink;
  "/items/orange_key_fragment": ItemKey;
  "/items/orange_yogurt": ItemFoodDrink;
  "/items/panda_fluff": ItemResource;
  "/items/panda_gloves": ItemEquipment;
  "/items/peach": ItemResource;
  "/items/peach_gummy": ItemFoodDrink;
  "/items/peach_yogurt": ItemFoodDrink;
  "/items/pearl": ItemResource;
  "/items/penetrating_shot": ItemBook;
  "/items/penetrating_strike": ItemBook;
  "/items/pestilent_shot": ItemBook;
  "/items/philosophers_earrings": ItemEquipment;
  "/items/philosophers_necklace": ItemEquipment;
  "/items/philosophers_ring": ItemEquipment;
  "/items/philosophers_stone": ItemResource;
  "/items/pincer_gloves": ItemEquipment;
  "/items/plum": ItemResource;
  "/items/plum_gummy": ItemFoodDrink;
  "/items/plum_yogurt": ItemFoodDrink;
  "/items/poke": ItemBook;
  "/items/polar_bear_fluff": ItemResource;
  "/items/polar_bear_shoes": ItemEquipment;
  "/items/power_coffee": BeijingPigeon;
  "/items/precision": ItemBook;
  "/items/prime_catalyst": ItemResource;
  "/items/processing_tea": BeijingPigeon;
  "/items/provoke": ItemBook;
  "/items/puncture": ItemBook;
  "/items/purple_key_fragment": ItemKey;
  "/items/purpleheart_bow": ItemEquipment;
  "/items/purpleheart_crossbow": ItemEquipment;
  "/items/purpleheart_fire_staff": ItemEquipment;
  "/items/purpleheart_log": ItemResource;
  "/items/purpleheart_lumber": ItemResource;
  "/items/purpleheart_nature_staff": ItemEquipment;
  "/items/purpleheart_shield": ItemEquipment;
  "/items/purpleheart_water_staff": ItemEquipment;
  "/items/purples_gift": ItemLoot;
  "/items/quick_aid": ItemBook;
  "/items/quick_shot": ItemBook;
  "/items/radiant_boots": ItemEquipment;
  "/items/radiant_fabric": ItemResource;
  "/items/radiant_fiber": ItemResource;
  "/items/radiant_gloves": ItemEquipment;
  "/items/radiant_hat": ItemEquipment;
  "/items/radiant_robe_bottoms": ItemEquipment;
  "/items/radiant_robe_top": ItemEquipment;
  "/items/rain_of_arrows": ItemBook;
  "/items/rainbow_alembic": ItemEquipment;
  "/items/rainbow_boots": ItemEquipment;
  "/items/rainbow_brush": ItemEquipment;
  "/items/rainbow_buckler": ItemEquipment;
  "/items/rainbow_bulwark": ItemEquipment;
  "/items/rainbow_cheese": ItemResource;
  "/items/rainbow_chisel": ItemEquipment;
  "/items/rainbow_enhancer": ItemEquipment;
  "/items/rainbow_gauntlets": ItemEquipment;
  "/items/rainbow_hammer": ItemEquipment;
  "/items/rainbow_hatchet": ItemEquipment;
  "/items/rainbow_helmet": ItemEquipment;
  "/items/rainbow_mace": ItemEquipment;
  "/items/rainbow_milk": ItemResource;
  "/items/rainbow_needle": ItemEquipment;
  "/items/rainbow_plate_body": ItemEquipment;
  "/items/rainbow_plate_legs": ItemEquipment;
  "/items/rainbow_pot": ItemEquipment;
  "/items/rainbow_shears": ItemEquipment;
  "/items/rainbow_spatula": ItemEquipment;
  "/items/rainbow_spear": ItemEquipment;
  "/items/rainbow_sword": ItemEquipment;
  "/items/ranged_coffee": BeijingPigeon;
  "/items/ranger_necklace": ItemEquipment;
  "/items/red_chefs_hat": ItemEquipment;
  "/items/red_panda_fluff": ItemResource;
  "/items/red_tea_leaf": ItemResource;
  "/items/redwood_bow": ItemEquipment;
  "/items/redwood_crossbow": ItemEquipment;
  "/items/redwood_fire_staff": ItemEquipment;
  "/items/redwood_log": ItemResource;
  "/items/redwood_lumber": ItemResource;
  "/items/redwood_nature_staff": ItemEquipment;
  "/items/redwood_shield": ItemEquipment;
  "/items/redwood_water_staff": ItemEquipment;
  "/items/regal_jewel": ItemResource;
  "/items/regal_sword": ItemEquipment;
  "/items/rejuvenate": ItemBook;
  "/items/reptile_boots": ItemEquipment;
  "/items/reptile_bracers": ItemEquipment;
  "/items/reptile_chaps": ItemEquipment;
  "/items/reptile_hide": ItemResource;
  "/items/reptile_hood": ItemEquipment;
  "/items/reptile_leather": ItemResource;
  "/items/reptile_tunic": ItemEquipment;
  "/items/revenant_anima": ItemResource;
  "/items/revenant_chaps": ItemEquipment;
  "/items/revenant_tunic": ItemEquipment;
  "/items/revive": ItemBook;
  "/items/ring_of_armor": ItemEquipment;
  "/items/ring_of_critical_strike": ItemEquipment;
  "/items/ring_of_essence_find": ItemEquipment;
  "/items/ring_of_gathering": ItemEquipment;
  "/items/ring_of_rare_find": ItemEquipment;
  "/items/ring_of_regeneration": ItemEquipment;
  "/items/ring_of_resistance": ItemEquipment;
  "/items/robusta_coffee_bean": ItemResource;
  "/items/rough_boots": ItemEquipment;
  "/items/rough_bracers": ItemEquipment;
  "/items/rough_chaps": ItemEquipment;
  "/items/rough_hide": ItemResource;
  "/items/rough_hood": ItemEquipment;
  "/items/rough_leather": ItemResource;
  "/items/rough_tunic": ItemEquipment;
  "/items/royal_cloth": ItemResource;
  "/items/royal_fire_robe_bottoms": ItemEquipment;
  "/items/royal_fire_robe_top": ItemEquipment;
  "/items/royal_nature_robe_bottoms": ItemEquipment;
  "/items/royal_nature_robe_top": ItemEquipment;
  "/items/royal_water_robe_bottoms": ItemEquipment;
  "/items/royal_water_robe_top": ItemEquipment;
  "/items/scratch": ItemBook;
  "/items/shard_of_protection": ItemResource;
  "/items/shoebill_feather": ItemResource;
  "/items/shoebill_shoes": ItemEquipment;
  "/items/sighted_bracers": ItemEquipment;
  "/items/silencing_shot": ItemBook;
  "/items/silk_boots": ItemEquipment;
  "/items/silk_fabric": ItemResource;
  "/items/silk_gloves": ItemEquipment;
  "/items/silk_hat": ItemEquipment;
  "/items/silk_robe_bottoms": ItemEquipment;
  "/items/silk_robe_top": ItemEquipment;
  "/items/sinister_cape": ItemEquipment;
  "/items/sinister_chest": ItemLoot;
  "/items/sinister_chest_key": ItemKey;
  "/items/sinister_entry_key": ItemKey;
  "/items/sinister_essence": ItemResource;
  "/items/sinister_token": ItemCurrency;
  "/items/smack": ItemBook;
  "/items/small_artisans_crate": ItemLoot;
  "/items/small_meteorite_cache": ItemLoot;
  "/items/small_pouch": ItemEquipment;
  "/items/small_treasure_chest": ItemLoot;
  "/items/smoke_burst": ItemBook;
  "/items/snail_shell": ItemResource;
  "/items/snail_shell_helmet": ItemEquipment;
  "/items/snake_fang": ItemResource;
  "/items/snake_fang_dirk": ItemEquipment;
  "/items/sorcerer_boots": ItemEquipment;
  "/items/sorcerer_essence": ItemResource;
  "/items/sorcerers_sole": ItemResource;
  "/items/soul_fragment": ItemResource;
  "/items/soul_hunter_crossbow": ItemEquipment;
  "/items/spaceberry": ItemResource;
  "/items/spaceberry_cake": ItemFoodDrink;
  "/items/spaceberry_donut": ItemFoodDrink;
  "/items/spacia_coffee_bean": ItemResource;
  "/items/speed_aura": ItemBook;
  "/items/spike_shell": ItemBook;
  "/items/spiked_bulwark": ItemEquipment;
  "/items/stalactite_shard": ItemResource;
  "/items/stalactite_spear": ItemEquipment;
  "/items/stamina_coffee": BeijingPigeon;
  "/items/star_fragment": ItemResource;
  "/items/star_fruit": ItemResource;
  "/items/star_fruit_gummy": ItemFoodDrink;
  "/items/star_fruit_yogurt": ItemFoodDrink;
  "/items/steady_shot": ItemBook;
  "/items/stone_key_fragment": ItemKey;
  "/items/strawberry": ItemResource;
  "/items/strawberry_cake": ItemFoodDrink;
  "/items/strawberry_donut": ItemFoodDrink;
  "/items/stunning_blow": ItemBook;
  "/items/sugar": ItemResource;
  "/items/sundering_crossbow": ItemEquipment;
  "/items/sundering_jewel": ItemResource;
  "/items/sunstone": ItemResource;
  "/items/super_alchemy_tea": BeijingPigeon;
  "/items/super_attack_coffee": BeijingPigeon;
  "/items/super_brewing_tea": BeijingPigeon;
  "/items/super_cheesesmithing_tea": BeijingPigeon;
  "/items/super_cooking_tea": BeijingPigeon;
  "/items/super_crafting_tea": BeijingPigeon;
  "/items/super_defense_coffee": BeijingPigeon;
  "/items/super_enhancing_tea": BeijingPigeon;
  "/items/super_foraging_tea": BeijingPigeon;
  "/items/super_intelligence_coffee": BeijingPigeon;
  "/items/super_magic_coffee": BeijingPigeon;
  "/items/super_milking_tea": BeijingPigeon;
  "/items/super_power_coffee": BeijingPigeon;
  "/items/super_ranged_coffee": BeijingPigeon;
  "/items/super_stamina_coffee": BeijingPigeon;
  "/items/super_tailoring_tea": BeijingPigeon;
  "/items/super_woodcutting_tea": BeijingPigeon;
  "/items/swamp_essence": ItemResource;
  "/items/sweep": ItemBook;
  "/items/swiftness_coffee": BeijingPigeon;
  "/items/sylvan_aura": ItemBook;
  "/items/tailoring_essence": ItemResource;
  "/items/tailoring_tea": BeijingPigeon;
  "/items/task_crystal": ItemResource;
  "/items/task_token": ItemCurrency;
  "/items/taunt": ItemBook;
  "/items/tome_of_healing": ItemEquipment;
  "/items/tome_of_the_elements": ItemEquipment;
  "/items/toughness": ItemBook;
  "/items/toxic_pollen": ItemBook;
  "/items/treant_bark": ItemResource;
  "/items/treant_shield": ItemEquipment;
  "/items/turtle_shell": ItemResource;
  "/items/turtle_shell_body": ItemEquipment;
  "/items/turtle_shell_legs": ItemEquipment;
  "/items/twilight_essence": ItemResource;
  "/items/ultra_alchemy_tea": BeijingPigeon;
  "/items/ultra_attack_coffee": BeijingPigeon;
  "/items/ultra_brewing_tea": BeijingPigeon;
  "/items/ultra_cheesesmithing_tea": BeijingPigeon;
  "/items/ultra_cooking_tea": BeijingPigeon;
  "/items/ultra_crafting_tea": BeijingPigeon;
  "/items/ultra_defense_coffee": BeijingPigeon;
  "/items/ultra_enhancing_tea": BeijingPigeon;
  "/items/ultra_foraging_tea": BeijingPigeon;
  "/items/ultra_intelligence_coffee": BeijingPigeon;
  "/items/ultra_magic_coffee": BeijingPigeon;
  "/items/ultra_milking_tea": BeijingPigeon;
  "/items/ultra_power_coffee": BeijingPigeon;
  "/items/ultra_ranged_coffee": BeijingPigeon;
  "/items/ultra_stamina_coffee": BeijingPigeon;
  "/items/ultra_tailoring_tea": BeijingPigeon;
  "/items/ultra_woodcutting_tea": BeijingPigeon;
  "/items/umbral_boots": ItemEquipment;
  "/items/umbral_bracers": ItemEquipment;
  "/items/umbral_chaps": ItemEquipment;
  "/items/umbral_hide": ItemResource;
  "/items/umbral_hood": ItemEquipment;
  "/items/umbral_leather": ItemResource;
  "/items/umbral_tunic": ItemEquipment;
  "/items/vampire_fang": ItemResource;
  "/items/vampire_fang_dirk": ItemEquipment;
  "/items/vampiric_bow": ItemEquipment;
  "/items/vampirism": ItemBook;
  "/items/verdant_alembic": ItemEquipment;
  "/items/verdant_boots": ItemEquipment;
  "/items/verdant_brush": ItemEquipment;
  "/items/verdant_buckler": ItemEquipment;
  "/items/verdant_bulwark": ItemEquipment;
  "/items/verdant_cheese": ItemResource;
  "/items/verdant_chisel": ItemEquipment;
  "/items/verdant_enhancer": ItemEquipment;
  "/items/verdant_gauntlets": ItemEquipment;
  "/items/verdant_hammer": ItemEquipment;
  "/items/verdant_hatchet": ItemEquipment;
  "/items/verdant_helmet": ItemEquipment;
  "/items/verdant_mace": ItemEquipment;
  "/items/verdant_milk": ItemResource;
  "/items/verdant_needle": ItemEquipment;
  "/items/verdant_plate_body": ItemEquipment;
  "/items/verdant_plate_legs": ItemEquipment;
  "/items/verdant_pot": ItemEquipment;
  "/items/verdant_shears": ItemEquipment;
  "/items/verdant_spatula": ItemEquipment;
  "/items/verdant_spear": ItemEquipment;
  "/items/verdant_sword": ItemEquipment;
  "/items/vision_helmet": ItemEquipment;
  "/items/vision_shield": ItemEquipment;
  "/items/watchful_relic": ItemEquipment;
  "/items/water_strike": ItemBook;
  "/items/werewolf_claw": ItemResource;
  "/items/werewolf_slasher": ItemEquipment;
  "/items/wheat": ItemResource;
  "/items/white_key_fragment": ItemKey;
  "/items/wisdom_coffee": BeijingPigeon;
  "/items/wisdom_tea": BeijingPigeon;
  "/items/wizard_necklace": ItemEquipment;
  "/items/woodcutting_essence": ItemResource;
  "/items/woodcutting_tea": BeijingPigeon;
  "/items/wooden_bow": ItemEquipment;
  "/items/wooden_crossbow": ItemEquipment;
  "/items/wooden_fire_staff": ItemEquipment;
  "/items/wooden_nature_staff": ItemEquipment;
  "/items/wooden_shield": ItemEquipment;
  "/items/wooden_water_staff": ItemEquipment;
  "/items/yogurt": ItemFoodDrink;
}

export interface ItemResource {
  hrid: string;
  name: string;
  description: string;
  categoryHrid: CategoryHrid;
  sellPrice: number;
  isTradable: boolean;
  itemLevel: number;
  sortIndex: number;
}

export interface ItemKey {
  hrid: string;
  name: string;
  description: string;
  categoryHrid: CategoryHrid;
  sellPrice: number;
  isTradable: boolean;
  itemLevel: number;
  sortIndex: number;
}

export interface ItemFoodDrink {
  hrid: string;
  name: string;
  description: string;
  categoryHrid: CategoryHrid;
  sellPrice: number;
  isTradable: boolean;
  itemLevel: number;
  consumableDetail: ConsumableDetail;
  sortIndex: number;
}

export interface ItemBook {
  hrid: string;
  name: string;
  description: string;
  categoryHrid: CategoryHrid;
  sellPrice: number;
  isTradable: bool;
  itemLevel: number;
  abilityBookDetail: AbilityBookDetail;
  sortIndex: number;
}

export interface ItemCurrency {
  hrid: string;
  name: string;
  description: string;
  categoryHrid: CategoryHrid;
  sellPrice: number;
  sortIndex: number;
}

export interface ItemLoot {
  hrid: string;
  name: string;
  description: string;
  categoryHrid: CategoryHrid;
  sellPrice: number;
  isOpenable: boolean;
  sortIndex: number;
}

export interface ItemDetail {
  hrid: string;
  name: string;
  description: string;
  categoryHrid: CategoryHrid;
  sellPrice: number;
  isTradable: boolean;
  isOpenable: boolean;
  itemLevel: number;
  enhancementCosts: Cost[] | null;
  protectionItemHrids: string[] | null;
  equipmentDetail: EquipmentDetail;
  consumableDetail: ConsumableDetail;
  abilityBookDetail: AbilityBookDetail;
  sortIndex: number;
}

export interface AbilityBookDetail {
  abilityHrid: string;
  levelRequirements: LevelRequirement[] | null;
  experienceGain: number;
}

export enum CategoryHrid {
  ItemCategoriesAbilityBook = "/item_categories/ability_book",
  ItemCategoriesCurrency = "/item_categories/currency",
  ItemCategoriesDrink = "/item_categories/drink",
  ItemCategoriesEquipment = "/item_categories/equipment",
  ItemCategoriesFood = "/item_categories/food",
  ItemCategoriesLoot = "/item_categories/loot",
  ItemCategoriesResource = "/item_categories/resource",
}

export interface ConsumableDetail {
  cooldownDuration: number;
  usableInActionTypeMap: { [key: string]: boolean } | null;
  hitpointRestore: number;
  manapointRestore: number;
  recoveryDuration: number;
  buffs: Buff[] | null;
  defaultCombatTriggers: DefaultCombatTrigger[] | null;
}

export interface EquipmentDetail {
  type: EquipmentDetailType;
  levelRequirements: LevelRequirement[] | null;
  combatStats: Combat;
  noncombatStats: { [key: string]: number };
  combatEnhancementBonuses: Combat;
  noncombatEnhancementBonuses: { [key: string]: number };
}

export enum EquipmentDetailType {
  Empty = "",
  EquipmentTypesBody = "/equipment_types/body",
  EquipmentTypesBrewingTool = "/equipment_types/brewing_tool",
  EquipmentTypesCheesesmithingTool = "/equipment_types/cheesesmithing_tool",
  EquipmentTypesCookingTool = "/equipment_types/cooking_tool",
  EquipmentTypesCraftingTool = "/equipment_types/crafting_tool",
  EquipmentTypesEarrings = "/equipment_types/earrings",
  EquipmentTypesEnhancingTool = "/equipment_types/enhancing_tool",
  EquipmentTypesFeet = "/equipment_types/feet",
  EquipmentTypesForagingTool = "/equipment_types/foraging_tool",
  EquipmentTypesHands = "/equipment_types/hands",
  EquipmentTypesHead = "/equipment_types/head",
  EquipmentTypesLegs = "/equipment_types/legs",
  EquipmentTypesMainHand = "/equipment_types/main_hand",
  EquipmentTypesMilkingTool = "/equipment_types/milking_tool",
  EquipmentTypesNeck = "/equipment_types/neck",
  EquipmentTypesOffHand = "/equipment_types/off_hand",
  EquipmentTypesPouch = "/equipment_types/pouch",
  EquipmentTypesRing = "/equipment_types/ring",
  EquipmentTypesTailoringTool = "/equipment_types/tailoring_tool",
  EquipmentTypesTwoHand = "/equipment_types/two_hand",
  EquipmentTypesWoodcuttingTool = "/equipment_types/woodcutting_tool",
}

export interface BeijingPigeon {
  hrid: string;
  name: string;
  description: string;
  categoryHrid: CategoryHrid;
  sellPrice: number;
  isTradable: boolean;
  isOpenable: boolean;
  itemLevel: number;
  enhancementCosts: Cost[];
  equipmentDetail: EquipmentDetail;
  consumableDetail: ConsumableDetail;
  abilityBookDetail: AbilityBookDetail;
  sortIndex: number;
}

export interface ItemLocationDetailMap {
  hrid: string;
  name: string;
  type: ItemLocationDetailMapType;
  isMultiItem: boolean;
  conflictingOtherItemLocationHrids: string[];
}

export enum ItemLocationDetailMapType {
  ItemLocationTypesEquipment = "/item_location_types/equipment",
  ItemLocationTypesInventory = "/item_location_types/inventory",
}
