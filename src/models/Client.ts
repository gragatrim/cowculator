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
  "/items/acrobatic_hood": BeijingPigeon;
  "/items/acrobats_ribbon": ItemResource;
  "/items/advanced_task_badge": BeijingPigeon;
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
  "/items/arcane_bow": BeijingPigeon;
  "/items/arcane_crossbow": BeijingPigeon;
  "/items/arcane_fire_staff": BeijingPigeon;
  "/items/arcane_log": ItemResource;
  "/items/arcane_lumber": ItemResource;
  "/items/arcane_nature_staff": BeijingPigeon;
  "/items/arcane_reflection": ItemBook;
  "/items/arcane_shield": BeijingPigeon;
  "/items/arcane_water_staff": BeijingPigeon;
  "/items/artisan_tea": BeijingPigeon;
  "/items/attack_coffee": BeijingPigeon;
  "/items/azure_alembic": BeijingPigeon;
  "/items/azure_boots": BeijingPigeon;
  "/items/azure_brush": BeijingPigeon;
  "/items/azure_buckler": BeijingPigeon;
  "/items/azure_bulwark": BeijingPigeon;
  "/items/azure_cheese": ItemResource;
  "/items/azure_chisel": BeijingPigeon;
  "/items/azure_enhancer": BeijingPigeon;
  "/items/azure_gauntlets": BeijingPigeon;
  "/items/azure_hammer": BeijingPigeon;
  "/items/azure_hatchet": BeijingPigeon;
  "/items/azure_helmet": BeijingPigeon;
  "/items/azure_mace": BeijingPigeon;
  "/items/azure_milk": ItemResource;
  "/items/azure_needle": BeijingPigeon;
  "/items/azure_plate_body": BeijingPigeon;
  "/items/azure_plate_legs": BeijingPigeon;
  "/items/azure_pot": BeijingPigeon;
  "/items/azure_shears": BeijingPigeon;
  "/items/azure_spatula": BeijingPigeon;
  "/items/azure_spear": BeijingPigeon;
  "/items/azure_sword": BeijingPigeon;
  "/items/bag_of_10_cowbells": ItemLoot;
  "/items/bamboo_boots": BeijingPigeon;
  "/items/bamboo_branch": ItemResource;
  "/items/bamboo_fabric": ItemResource;
  "/items/bamboo_gloves": BeijingPigeon;
  "/items/bamboo_hat": BeijingPigeon;
  "/items/bamboo_robe_bottoms": BeijingPigeon;
  "/items/bamboo_robe_top": BeijingPigeon;
  "/items/basic_task_badge": BeijingPigeon;
  "/items/bear_essence": ItemResource;
  "/items/beast_boots": BeijingPigeon;
  "/items/beast_bracers": BeijingPigeon;
  "/items/beast_chaps": BeijingPigeon;
  "/items/beast_hide": ItemResource;
  "/items/beast_hood": BeijingPigeon;
  "/items/beast_leather": ItemResource;
  "/items/beast_tunic": BeijingPigeon;
  "/items/berserk": ItemBook;
  "/items/birch_bow": BeijingPigeon;
  "/items/birch_crossbow": BeijingPigeon;
  "/items/birch_fire_staff": BeijingPigeon;
  "/items/birch_log": ItemResource;
  "/items/birch_lumber": ItemResource;
  "/items/birch_nature_staff": BeijingPigeon;
  "/items/birch_shield": BeijingPigeon;
  "/items/birch_water_staff": BeijingPigeon;
  "/items/bishops_codex": BeijingPigeon;
  "/items/bishops_scroll": ItemResource;
  "/items/black_bear_fluff": ItemResource;
  "/items/black_bear_shoes": BeijingPigeon;
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
  "/items/burble_alembic": BeijingPigeon;
  "/items/burble_boots": BeijingPigeon;
  "/items/burble_brush": BeijingPigeon;
  "/items/burble_buckler": BeijingPigeon;
  "/items/burble_bulwark": BeijingPigeon;
  "/items/burble_cheese": ItemResource;
  "/items/burble_chisel": BeijingPigeon;
  "/items/burble_enhancer": BeijingPigeon;
  "/items/burble_gauntlets": BeijingPigeon;
  "/items/burble_hammer": BeijingPigeon;
  "/items/burble_hatchet": BeijingPigeon;
  "/items/burble_helmet": BeijingPigeon;
  "/items/burble_mace": BeijingPigeon;
  "/items/burble_milk": ItemResource;
  "/items/burble_needle": BeijingPigeon;
  "/items/burble_plate_body": BeijingPigeon;
  "/items/burble_plate_legs": BeijingPigeon;
  "/items/burble_pot": BeijingPigeon;
  "/items/burble_shears": BeijingPigeon;
  "/items/burble_spatula": BeijingPigeon;
  "/items/burble_spear": BeijingPigeon;
  "/items/burble_sword": BeijingPigeon;
  "/items/burble_tea_leaf": ItemResource;
  "/items/burning_key_fragment": ItemKey;
  "/items/catalyst_of_coinification": ItemResource;
  "/items/catalyst_of_decomposition": ItemResource;
  "/items/catalyst_of_transmutation": ItemResource;
  "/items/catalytic_tea": BeijingPigeon;
  "/items/cedar_bow": BeijingPigeon;
  "/items/cedar_crossbow": BeijingPigeon;
  "/items/cedar_fire_staff": BeijingPigeon;
  "/items/cedar_log": ItemResource;
  "/items/cedar_lumber": ItemResource;
  "/items/cedar_nature_staff": BeijingPigeon;
  "/items/cedar_shield": BeijingPigeon;
  "/items/cedar_water_staff": BeijingPigeon;
  "/items/centaur_boots": BeijingPigeon;
  "/items/centaur_hoof": ItemResource;
  "/items/channeling_coffee": BeijingPigeon;
  "/items/chaotic_chain": ItemResource;
  "/items/chaotic_flail": BeijingPigeon;
  "/items/cheese": ItemResource;
  "/items/cheese_alembic": BeijingPigeon;
  "/items/cheese_boots": BeijingPigeon;
  "/items/cheese_brush": BeijingPigeon;
  "/items/cheese_buckler": BeijingPigeon;
  "/items/cheese_bulwark": BeijingPigeon;
  "/items/cheese_chisel": BeijingPigeon;
  "/items/cheese_enhancer": BeijingPigeon;
  "/items/cheese_gauntlets": BeijingPigeon;
  "/items/cheese_hammer": BeijingPigeon;
  "/items/cheese_hatchet": BeijingPigeon;
  "/items/cheese_helmet": BeijingPigeon;
  "/items/cheese_mace": BeijingPigeon;
  "/items/cheese_needle": BeijingPigeon;
  "/items/cheese_plate_body": BeijingPigeon;
  "/items/cheese_plate_legs": BeijingPigeon;
  "/items/cheese_pot": BeijingPigeon;
  "/items/cheese_shears": BeijingPigeon;
  "/items/cheese_spatula": BeijingPigeon;
  "/items/cheese_spear": BeijingPigeon;
  "/items/cheese_sword": BeijingPigeon;
  "/items/cheesesmithing_essence": ItemResource;
  "/items/cheesesmithing_tea": BeijingPigeon;
  "/items/chimerical_chest": ItemLoot;
  "/items/chimerical_chest_key": ItemKey;
  "/items/chimerical_entry_key": ItemKey;
  "/items/chimerical_essence": ItemResource;
  "/items/chimerical_quiver": BeijingPigeon;
  "/items/chimerical_token": ItemCurrency;
  "/items/chrono_gloves": BeijingPigeon;
  "/items/chrono_sphere": ItemResource;
  "/items/cleave": ItemBook;
  "/items/cocoon": ItemResource;
  "/items/coin": ItemCurrency;
  "/items/collectors_boots": BeijingPigeon;
  "/items/colossus_core": ItemResource;
  "/items/colossus_plate_body": BeijingPigeon;
  "/items/colossus_plate_legs": BeijingPigeon;
  "/items/cooking_essence": ItemResource;
  "/items/cooking_tea": BeijingPigeon;
  "/items/cotton": ItemResource;
  "/items/cotton_boots": BeijingPigeon;
  "/items/cotton_fabric": ItemResource;
  "/items/cotton_gloves": BeijingPigeon;
  "/items/cotton_hat": BeijingPigeon;
  "/items/cotton_robe_bottoms": BeijingPigeon;
  "/items/cotton_robe_top": BeijingPigeon;
  "/items/cowbell": ItemCurrency;
  "/items/crab_pincer": ItemResource;
  "/items/crafting_essence": ItemResource;
  "/items/crafting_tea": BeijingPigeon;
  "/items/crimson_alembic": BeijingPigeon;
  "/items/crimson_boots": BeijingPigeon;
  "/items/crimson_brush": BeijingPigeon;
  "/items/crimson_buckler": BeijingPigeon;
  "/items/crimson_bulwark": BeijingPigeon;
  "/items/crimson_cheese": ItemResource;
  "/items/crimson_chisel": BeijingPigeon;
  "/items/crimson_enhancer": BeijingPigeon;
  "/items/crimson_gauntlets": BeijingPigeon;
  "/items/crimson_hammer": BeijingPigeon;
  "/items/crimson_hatchet": BeijingPigeon;
  "/items/crimson_helmet": BeijingPigeon;
  "/items/crimson_mace": BeijingPigeon;
  "/items/crimson_milk": ItemResource;
  "/items/crimson_needle": BeijingPigeon;
  "/items/crimson_plate_body": BeijingPigeon;
  "/items/crimson_plate_legs": BeijingPigeon;
  "/items/crimson_pot": BeijingPigeon;
  "/items/crimson_shears": BeijingPigeon;
  "/items/crimson_spatula": BeijingPigeon;
  "/items/crimson_spear": BeijingPigeon;
  "/items/crimson_sword": BeijingPigeon;
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
  "/items/cursed_bow": BeijingPigeon;
  "/items/dark_key_fragment": ItemKey;
  "/items/defense_coffee": BeijingPigeon;
  "/items/demonic_core": ItemResource;
  "/items/demonic_plate_body": BeijingPigeon;
  "/items/demonic_plate_legs": BeijingPigeon;
  "/items/dodocamel_gauntlets": BeijingPigeon;
  "/items/dodocamel_plume": ItemResource;
  "/items/donut": ItemFoodDrink;
  "/items/dragon_fruit": ItemResource;
  "/items/dragon_fruit_gummy": ItemFoodDrink;
  "/items/dragon_fruit_yogurt": ItemFoodDrink;
  "/items/earrings_of_armor": BeijingPigeon;
  "/items/earrings_of_critical_strike": BeijingPigeon;
  "/items/earrings_of_essence_find": BeijingPigeon;
  "/items/earrings_of_gathering": BeijingPigeon;
  "/items/earrings_of_rare_find": BeijingPigeon;
  "/items/earrings_of_regeneration": BeijingPigeon;
  "/items/earrings_of_resistance": BeijingPigeon;
  "/items/efficiency_tea": BeijingPigeon;
  "/items/egg": ItemResource;
  "/items/elemental_affinity": ItemBook;
  "/items/elusiveness": ItemBook;
  "/items/emp_tea_leaf": ItemResource;
  "/items/enchanted_chest": ItemLoot;
  "/items/enchanted_chest_key": ItemKey;
  "/items/enchanted_cloak": BeijingPigeon;
  "/items/enchanted_entry_key": ItemKey;
  "/items/enchanted_essence": ItemResource;
  "/items/enchanted_gloves": BeijingPigeon;
  "/items/enchanted_token": ItemCurrency;
  "/items/enhancing_essence": ItemResource;
  "/items/enhancing_tea": BeijingPigeon;
  "/items/entangle": ItemBook;
  "/items/excelsa_coffee_bean": ItemResource;
  "/items/expert_task_badge": BeijingPigeon;
  "/items/eye_of_the_watcher": ItemResource;
  "/items/eye_watch": BeijingPigeon;
  "/items/eyessence": ItemResource;
  "/items/fierce_aura": ItemBook;
  "/items/fieriosa_coffee_bean": ItemResource;
  "/items/fighter_necklace": BeijingPigeon;
  "/items/fireball": ItemBook;
  "/items/firestorm": ItemBook;
  "/items/flame_arrow": ItemBook;
  "/items/flame_aura": ItemBook;
  "/items/flame_blast": ItemBook;
  "/items/flaming_cloth": ItemResource;
  "/items/flaming_robe_bottoms": BeijingPigeon;
  "/items/flaming_robe_top": BeijingPigeon;
  "/items/flax": ItemResource;
  "/items/fluffy_red_hat": BeijingPigeon;
  "/items/foraging_essence": ItemResource;
  "/items/foraging_tea": BeijingPigeon;
  "/items/frenzy": ItemBook;
  "/items/frost_sphere": ItemResource;
  "/items/frost_staff": BeijingPigeon;
  "/items/frost_surge": ItemBook;
  "/items/garnet": ItemResource;
  "/items/gathering_tea": BeijingPigeon;
  "/items/gator_vest": BeijingPigeon;
  "/items/giant_pouch": BeijingPigeon;
  "/items/ginkgo_bow": BeijingPigeon;
  "/items/ginkgo_crossbow": BeijingPigeon;
  "/items/ginkgo_fire_staff": BeijingPigeon;
  "/items/ginkgo_log": ItemResource;
  "/items/ginkgo_lumber": ItemResource;
  "/items/ginkgo_nature_staff": BeijingPigeon;
  "/items/ginkgo_shield": BeijingPigeon;
  "/items/ginkgo_water_staff": BeijingPigeon;
  "/items/gluttonous_energy": ItemResource;
  "/items/gluttonous_pouch": BeijingPigeon;
  "/items/gobo_boomstick": BeijingPigeon;
  "/items/gobo_boots": BeijingPigeon;
  "/items/gobo_bracers": BeijingPigeon;
  "/items/gobo_chaps": BeijingPigeon;
  "/items/gobo_defender": BeijingPigeon;
  "/items/gobo_essence": ItemResource;
  "/items/gobo_hide": ItemResource;
  "/items/gobo_hood": BeijingPigeon;
  "/items/gobo_leather": ItemResource;
  "/items/gobo_rag": ItemResource;
  "/items/gobo_shooter": BeijingPigeon;
  "/items/gobo_slasher": BeijingPigeon;
  "/items/gobo_smasher": BeijingPigeon;
  "/items/gobo_stabber": BeijingPigeon;
  "/items/gobo_tunic": BeijingPigeon;
  "/items/goggles": ItemResource;
  "/items/golem_essence": ItemResource;
  "/items/gourmet_tea": BeijingPigeon;
  "/items/granite_bludgeon": BeijingPigeon;
  "/items/green_key_fragment": ItemKey;
  "/items/green_tea_leaf": ItemResource;
  "/items/griffin_bulwark": BeijingPigeon;
  "/items/griffin_chaps": BeijingPigeon;
  "/items/griffin_leather": ItemResource;
  "/items/griffin_talon": ItemResource;
  "/items/griffin_tunic": BeijingPigeon;
  "/items/grizzly_bear_fluff": ItemResource;
  "/items/grizzly_bear_shoes": BeijingPigeon;
  "/items/gummy": ItemFoodDrink;
  "/items/guzzling_energy": ItemResource;
  "/items/guzzling_pouch": BeijingPigeon;
  "/items/heal": ItemBook;
  "/items/holy_alembic": BeijingPigeon;
  "/items/holy_boots": BeijingPigeon;
  "/items/holy_brush": BeijingPigeon;
  "/items/holy_buckler": BeijingPigeon;
  "/items/holy_bulwark": BeijingPigeon;
  "/items/holy_cheese": ItemResource;
  "/items/holy_chisel": BeijingPigeon;
  "/items/holy_enhancer": BeijingPigeon;
  "/items/holy_gauntlets": BeijingPigeon;
  "/items/holy_hammer": BeijingPigeon;
  "/items/holy_hatchet": BeijingPigeon;
  "/items/holy_helmet": BeijingPigeon;
  "/items/holy_mace": BeijingPigeon;
  "/items/holy_milk": ItemResource;
  "/items/holy_needle": BeijingPigeon;
  "/items/holy_plate_body": BeijingPigeon;
  "/items/holy_plate_legs": BeijingPigeon;
  "/items/holy_pot": BeijingPigeon;
  "/items/holy_shears": BeijingPigeon;
  "/items/holy_spatula": BeijingPigeon;
  "/items/holy_spear": BeijingPigeon;
  "/items/holy_sword": BeijingPigeon;
  "/items/ice_spear": ItemBook;
  "/items/icy_cloth": ItemResource;
  "/items/icy_robe_bottoms": BeijingPigeon;
  "/items/icy_robe_top": BeijingPigeon;
  "/items/impale": ItemBook;
  "/items/infernal_battlestaff": BeijingPigeon;
  "/items/infernal_ember": ItemResource;
  "/items/insanity": ItemBook;
  "/items/intelligence_coffee": BeijingPigeon;
  "/items/invincible": ItemBook;
  "/items/jackalope_antler": ItemResource;
  "/items/jackalope_staff": BeijingPigeon;
  "/items/jade": ItemResource;
  "/items/jungle_essence": ItemResource;
  "/items/knights_aegis": BeijingPigeon;
  "/items/knights_ingot": ItemResource;
  "/items/large_artisans_crate": ItemLoot;
  "/items/large_meteorite_cache": ItemLoot;
  "/items/large_pouch": BeijingPigeon;
  "/items/large_treasure_chest": ItemLoot;
  "/items/liberica_coffee_bean": ItemResource;
  "/items/linen_boots": BeijingPigeon;
  "/items/linen_fabric": ItemResource;
  "/items/linen_gloves": BeijingPigeon;
  "/items/linen_hat": BeijingPigeon;
  "/items/linen_robe_bottoms": BeijingPigeon;
  "/items/linen_robe_top": BeijingPigeon;
  "/items/living_granite": ItemResource;
  "/items/log": ItemResource;
  "/items/lucky_coffee": BeijingPigeon;
  "/items/lumber": ItemResource;
  "/items/luna_robe_bottoms": BeijingPigeon;
  "/items/luna_robe_top": BeijingPigeon;
  "/items/luna_wing": ItemResource;
  "/items/magic_coffee": BeijingPigeon;
  "/items/magicians_cloth": ItemResource;
  "/items/magicians_hat": BeijingPigeon;
  "/items/magnet": ItemResource;
  "/items/magnetic_gloves": BeijingPigeon;
  "/items/magnifying_glass": ItemResource;
  "/items/maim": ItemBook;
  "/items/mana_spring": ItemBook;
  "/items/manticore_shield": BeijingPigeon;
  "/items/manticore_sting": ItemResource;
  "/items/marine_chaps": BeijingPigeon;
  "/items/marine_scale": ItemResource;
  "/items/marine_tunic": BeijingPigeon;
  "/items/marsberry": ItemResource;
  "/items/marsberry_cake": ItemFoodDrink;
  "/items/marsberry_donut": ItemFoodDrink;
  "/items/medium_artisans_crate": ItemLoot;
  "/items/medium_meteorite_cache": ItemLoot;
  "/items/medium_pouch": BeijingPigeon;
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
  "/items/necklace_of_efficiency": BeijingPigeon;
  "/items/necklace_of_speed": BeijingPigeon;
  "/items/necklace_of_wisdom": BeijingPigeon;
  "/items/orange": ItemResource;
  "/items/orange_gummy": ItemFoodDrink;
  "/items/orange_key_fragment": ItemKey;
  "/items/orange_yogurt": ItemFoodDrink;
  "/items/panda_fluff": ItemResource;
  "/items/panda_gloves": BeijingPigeon;
  "/items/peach": ItemResource;
  "/items/peach_gummy": ItemFoodDrink;
  "/items/peach_yogurt": ItemFoodDrink;
  "/items/pearl": ItemResource;
  "/items/penetrating_shot": ItemBook;
  "/items/penetrating_strike": ItemBook;
  "/items/pestilent_shot": ItemBook;
  "/items/philosophers_earrings": BeijingPigeon;
  "/items/philosophers_necklace": BeijingPigeon;
  "/items/philosophers_ring": BeijingPigeon;
  "/items/philosophers_stone": ItemResource;
  "/items/pincer_gloves": BeijingPigeon;
  "/items/plum": ItemResource;
  "/items/plum_gummy": ItemFoodDrink;
  "/items/plum_yogurt": ItemFoodDrink;
  "/items/poke": ItemBook;
  "/items/polar_bear_fluff": ItemResource;
  "/items/polar_bear_shoes": BeijingPigeon;
  "/items/power_coffee": BeijingPigeon;
  "/items/precision": ItemBook;
  "/items/prime_catalyst": ItemResource;
  "/items/processing_tea": BeijingPigeon;
  "/items/provoke": ItemBook;
  "/items/puncture": ItemBook;
  "/items/purple_key_fragment": ItemKey;
  "/items/purpleheart_bow": BeijingPigeon;
  "/items/purpleheart_crossbow": BeijingPigeon;
  "/items/purpleheart_fire_staff": BeijingPigeon;
  "/items/purpleheart_log": ItemResource;
  "/items/purpleheart_lumber": ItemResource;
  "/items/purpleheart_nature_staff": BeijingPigeon;
  "/items/purpleheart_shield": BeijingPigeon;
  "/items/purpleheart_water_staff": BeijingPigeon;
  "/items/purples_gift": ItemLoot;
  "/items/quick_aid": ItemBook;
  "/items/quick_shot": ItemBook;
  "/items/radiant_boots": BeijingPigeon;
  "/items/radiant_fabric": ItemResource;
  "/items/radiant_fiber": ItemResource;
  "/items/radiant_gloves": BeijingPigeon;
  "/items/radiant_hat": BeijingPigeon;
  "/items/radiant_robe_bottoms": BeijingPigeon;
  "/items/radiant_robe_top": BeijingPigeon;
  "/items/rain_of_arrows": ItemBook;
  "/items/rainbow_alembic": BeijingPigeon;
  "/items/rainbow_boots": BeijingPigeon;
  "/items/rainbow_brush": BeijingPigeon;
  "/items/rainbow_buckler": BeijingPigeon;
  "/items/rainbow_bulwark": BeijingPigeon;
  "/items/rainbow_cheese": ItemResource;
  "/items/rainbow_chisel": BeijingPigeon;
  "/items/rainbow_enhancer": BeijingPigeon;
  "/items/rainbow_gauntlets": BeijingPigeon;
  "/items/rainbow_hammer": BeijingPigeon;
  "/items/rainbow_hatchet": BeijingPigeon;
  "/items/rainbow_helmet": BeijingPigeon;
  "/items/rainbow_mace": BeijingPigeon;
  "/items/rainbow_milk": ItemResource;
  "/items/rainbow_needle": BeijingPigeon;
  "/items/rainbow_plate_body": BeijingPigeon;
  "/items/rainbow_plate_legs": BeijingPigeon;
  "/items/rainbow_pot": BeijingPigeon;
  "/items/rainbow_shears": BeijingPigeon;
  "/items/rainbow_spatula": BeijingPigeon;
  "/items/rainbow_spear": BeijingPigeon;
  "/items/rainbow_sword": BeijingPigeon;
  "/items/ranged_coffee": BeijingPigeon;
  "/items/ranger_necklace": BeijingPigeon;
  "/items/red_chefs_hat": BeijingPigeon;
  "/items/red_panda_fluff": ItemResource;
  "/items/red_tea_leaf": ItemResource;
  "/items/redwood_bow": BeijingPigeon;
  "/items/redwood_crossbow": BeijingPigeon;
  "/items/redwood_fire_staff": BeijingPigeon;
  "/items/redwood_log": ItemResource;
  "/items/redwood_lumber": ItemResource;
  "/items/redwood_nature_staff": BeijingPigeon;
  "/items/redwood_shield": BeijingPigeon;
  "/items/redwood_water_staff": BeijingPigeon;
  "/items/regal_jewel": ItemResource;
  "/items/regal_sword": BeijingPigeon;
  "/items/rejuvenate": ItemBook;
  "/items/reptile_boots": BeijingPigeon;
  "/items/reptile_bracers": BeijingPigeon;
  "/items/reptile_chaps": BeijingPigeon;
  "/items/reptile_hide": ItemResource;
  "/items/reptile_hood": BeijingPigeon;
  "/items/reptile_leather": ItemResource;
  "/items/reptile_tunic": BeijingPigeon;
  "/items/revenant_anima": ItemResource;
  "/items/revenant_chaps": BeijingPigeon;
  "/items/revenant_tunic": BeijingPigeon;
  "/items/revive": ItemBook;
  "/items/ring_of_armor": BeijingPigeon;
  "/items/ring_of_critical_strike": BeijingPigeon;
  "/items/ring_of_essence_find": BeijingPigeon;
  "/items/ring_of_gathering": BeijingPigeon;
  "/items/ring_of_rare_find": BeijingPigeon;
  "/items/ring_of_regeneration": BeijingPigeon;
  "/items/ring_of_resistance": BeijingPigeon;
  "/items/robusta_coffee_bean": ItemResource;
  "/items/rough_boots": BeijingPigeon;
  "/items/rough_bracers": BeijingPigeon;
  "/items/rough_chaps": BeijingPigeon;
  "/items/rough_hide": ItemResource;
  "/items/rough_hood": BeijingPigeon;
  "/items/rough_leather": ItemResource;
  "/items/rough_tunic": BeijingPigeon;
  "/items/royal_cloth": ItemResource;
  "/items/royal_fire_robe_bottoms": BeijingPigeon;
  "/items/royal_fire_robe_top": BeijingPigeon;
  "/items/royal_nature_robe_bottoms": BeijingPigeon;
  "/items/royal_nature_robe_top": BeijingPigeon;
  "/items/royal_water_robe_bottoms": BeijingPigeon;
  "/items/royal_water_robe_top": BeijingPigeon;
  "/items/scratch": ItemBook;
  "/items/shard_of_protection": ItemResource;
  "/items/shoebill_feather": ItemResource;
  "/items/shoebill_shoes": BeijingPigeon;
  "/items/sighted_bracers": BeijingPigeon;
  "/items/silencing_shot": ItemBook;
  "/items/silk_boots": BeijingPigeon;
  "/items/silk_fabric": ItemResource;
  "/items/silk_gloves": BeijingPigeon;
  "/items/silk_hat": BeijingPigeon;
  "/items/silk_robe_bottoms": BeijingPigeon;
  "/items/silk_robe_top": BeijingPigeon;
  "/items/sinister_cape": BeijingPigeon;
  "/items/sinister_chest": ItemLoot;
  "/items/sinister_chest_key": ItemKey;
  "/items/sinister_entry_key": ItemKey;
  "/items/sinister_essence": ItemResource;
  "/items/sinister_token": ItemCurrency;
  "/items/smack": ItemBook;
  "/items/small_artisans_crate": ItemLoot;
  "/items/small_meteorite_cache": ItemLoot;
  "/items/small_pouch": BeijingPigeon;
  "/items/small_treasure_chest": ItemLoot;
  "/items/smoke_burst": ItemBook;
  "/items/snail_shell": ItemResource;
  "/items/snail_shell_helmet": BeijingPigeon;
  "/items/snake_fang": ItemResource;
  "/items/snake_fang_dirk": BeijingPigeon;
  "/items/sorcerer_boots": BeijingPigeon;
  "/items/sorcerer_essence": ItemResource;
  "/items/sorcerers_sole": ItemResource;
  "/items/soul_fragment": ItemResource;
  "/items/soul_hunter_crossbow": BeijingPigeon;
  "/items/spaceberry": ItemResource;
  "/items/spaceberry_cake": ItemFoodDrink;
  "/items/spaceberry_donut": ItemFoodDrink;
  "/items/spacia_coffee_bean": ItemResource;
  "/items/speed_aura": ItemBook;
  "/items/spike_shell": ItemBook;
  "/items/spiked_bulwark": BeijingPigeon;
  "/items/stalactite_shard": ItemResource;
  "/items/stalactite_spear": BeijingPigeon;
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
  "/items/sundering_crossbow": BeijingPigeon;
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
  "/items/tome_of_healing": BeijingPigeon;
  "/items/tome_of_the_elements": BeijingPigeon;
  "/items/toughness": ItemBook;
  "/items/toxic_pollen": ItemBook;
  "/items/treant_bark": ItemResource;
  "/items/treant_shield": BeijingPigeon;
  "/items/turtle_shell": ItemResource;
  "/items/turtle_shell_body": BeijingPigeon;
  "/items/turtle_shell_legs": BeijingPigeon;
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
  "/items/umbral_boots": BeijingPigeon;
  "/items/umbral_bracers": BeijingPigeon;
  "/items/umbral_chaps": BeijingPigeon;
  "/items/umbral_hide": ItemResource;
  "/items/umbral_hood": BeijingPigeon;
  "/items/umbral_leather": ItemResource;
  "/items/umbral_tunic": BeijingPigeon;
  "/items/vampire_fang": ItemResource;
  "/items/vampire_fang_dirk": BeijingPigeon;
  "/items/vampiric_bow": BeijingPigeon;
  "/items/vampirism": ItemBook;
  "/items/verdant_alembic": BeijingPigeon;
  "/items/verdant_boots": BeijingPigeon;
  "/items/verdant_brush": BeijingPigeon;
  "/items/verdant_buckler": BeijingPigeon;
  "/items/verdant_bulwark": BeijingPigeon;
  "/items/verdant_cheese": ItemResource;
  "/items/verdant_chisel": BeijingPigeon;
  "/items/verdant_enhancer": BeijingPigeon;
  "/items/verdant_gauntlets": BeijingPigeon;
  "/items/verdant_hammer": BeijingPigeon;
  "/items/verdant_hatchet": BeijingPigeon;
  "/items/verdant_helmet": BeijingPigeon;
  "/items/verdant_mace": BeijingPigeon;
  "/items/verdant_milk": ItemResource;
  "/items/verdant_needle": BeijingPigeon;
  "/items/verdant_plate_body": BeijingPigeon;
  "/items/verdant_plate_legs": BeijingPigeon;
  "/items/verdant_pot": BeijingPigeon;
  "/items/verdant_shears": BeijingPigeon;
  "/items/verdant_spatula": BeijingPigeon;
  "/items/verdant_spear": BeijingPigeon;
  "/items/verdant_sword": BeijingPigeon;
  "/items/vision_helmet": BeijingPigeon;
  "/items/vision_shield": BeijingPigeon;
  "/items/watchful_relic": BeijingPigeon;
  "/items/water_strike": ItemBook;
  "/items/werewolf_claw": ItemResource;
  "/items/werewolf_slasher": BeijingPigeon;
  "/items/wheat": ItemResource;
  "/items/white_key_fragment": ItemKey;
  "/items/wisdom_coffee": BeijingPigeon;
  "/items/wisdom_tea": BeijingPigeon;
  "/items/wizard_necklace": BeijingPigeon;
  "/items/woodcutting_essence": ItemResource;
  "/items/woodcutting_tea": BeijingPigeon;
  "/items/wooden_bow": BeijingPigeon;
  "/items/wooden_crossbow": BeijingPigeon;
  "/items/wooden_fire_staff": BeijingPigeon;
  "/items/wooden_nature_staff": BeijingPigeon;
  "/items/wooden_shield": BeijingPigeon;
  "/items/wooden_water_staff": BeijingPigeon;
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
  isTradable: boolean;
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
